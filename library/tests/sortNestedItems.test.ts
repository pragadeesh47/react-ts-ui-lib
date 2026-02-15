import { applySortNestedItems } from "../ui/src/basic-components/SideBar.utils";

/**
 * Type mirroring SideBarItem for test data construction.
 */
type SideBarItem = {
    title: string;
    icon?: string;
    itemList?: SideBarItem[];
};

// ─────────────────────────────────────────────────────────────
// 1. Default davranış — prop yok / false iken sıra değişmemeli
// ─────────────────────────────────────────────────────────────
describe("Default behavior (sortNestedItems = false / undefined)", () => {
    const nested: SideBarItem[] = [
        { title: "Zebra" },
        { title: "Apple" },
        { title: "Mango" },
    ];
    const originalCopy = [
        { title: "Zebra" },
        { title: "Apple" },
        { title: "Mango" },
    ];

    it("does not sort when sortNestedItems is undefined", () => {
        const result = applySortNestedItems(nested, undefined);

        expect(result).toEqual(originalCopy);
        expect(nested).toEqual(originalCopy); // not mutated
    });

    it("does not sort when sortNestedItems is false", () => {
        const result = applySortNestedItems(nested, false);

        expect(result).toEqual(originalCopy);
        expect(nested).toEqual(originalCopy); // not mutated
    });
});

// ─────────────────────────────────────────────────────────────
// 2. Sadece nested sort edilmeli, top-level sırası değişmemeli
// ─────────────────────────────────────────────────────────────
describe("Only nested items are sorted, top-level stays intact", () => {
    it("sorts nested items by title ascending", () => {
        const nested: SideBarItem[] = [
            { title: "Security" },
            { title: "Account" },
            { title: "Profile" },
        ];

        const sorted = applySortNestedItems(nested, true)!;

        expect(sorted.map(x => x.title)).toEqual(["Account", "Profile", "Security"]);
    });

    it("top-level item order is not affected (sort only applies to nested)", () => {
        const topLevel: SideBarItem[] = [
            {
                title: "Zebra Section",
                itemList: [{ title: "C" }, { title: "A" }, { title: "B" }],
            },
            {
                title: "Apple Section",
                itemList: [{ title: "Z" }, { title: "X" }, { title: "Y" }],
            },
        ];

        // Top-level is NOT sorted (component maps them directly, not through applySortNestedItems)
        expect(topLevel.map(x => x.title)).toEqual(["Zebra Section", "Apple Section"]);

        // But nested IS sorted
        const nestedSorted1 = applySortNestedItems(topLevel[0].itemList, true)!;
        expect(nestedSorted1.map(x => x.title)).toEqual(["A", "B", "C"]);

        const nestedSorted2 = applySortNestedItems(topLevel[1].itemList, true)!;
        expect(nestedSorted2.map(x => x.title)).toEqual(["X", "Y", "Z"]);
    });
});

// ─────────────────────────────────────────────────────────────
// 3. İmmutability — orijinal veri mutate EDİLMEMELİ
// ─────────────────────────────────────────────────────────────
describe("Immutability", () => {
    it("does not mutate the original array (Object.freeze test)", () => {
        const nested: SideBarItem[] = Object.freeze([
            Object.freeze({ title: "Banana" }),
            Object.freeze({ title: "Apple" }),
            Object.freeze({ title: "Cherry" }),
        ]) as SideBarItem[];

        // If sort() is called on the frozen array directly, this will throw.
        // [...items].sort() creates a copy first, so it should NOT throw.
        expect(() => applySortNestedItems(nested, true)).not.toThrow();

        const sorted = applySortNestedItems(nested, true)!;
        expect(sorted.map(x => x.title)).toEqual(["Apple", "Banana", "Cherry"]);
    });

    it("returns a new array reference when sorting", () => {
        const nested: SideBarItem[] = [
            { title: "B" },
            { title: "A" },
        ];

        const sorted = applySortNestedItems(nested, true);

        expect(sorted).not.toBe(nested);
    });

    it("original array order is preserved after sorting", () => {
        const nested: SideBarItem[] = [
            { title: "Zebra" },
            { title: "Apple" },
            { title: "Mango" },
        ];
        const originalCopy = [
            { title: "Zebra" },
            { title: "Apple" },
            { title: "Mango" },
        ];

        applySortNestedItems(nested, true);

        expect(nested).toEqual(originalCopy);
    });
});

// ─────────────────────────────────────────────────────────────
// 4. Dinamik güncelleme — yeni item eklenince sıralama korunur
// ─────────────────────────────────────────────────────────────
describe("Dynamic updates (new items maintain sort order)", () => {
    it("sorts correctly after a new item is added", () => {
        const initial: SideBarItem[] = [
            { title: "Charlie" },
            { title: "Alpha" },
        ];

        const sorted1 = applySortNestedItems(initial, true)!;
        expect(sorted1.map(x => x.title)).toEqual(["Alpha", "Charlie"]);

        // Simulate rerender with a new item added
        const updated: SideBarItem[] = [
            ...initial,
            { title: "Bravo" },
        ];

        const sorted2 = applySortNestedItems(updated, true)!;
        expect(sorted2.map(x => x.title)).toEqual(["Alpha", "Bravo", "Charlie"]);
    });
});

// ─────────────────────────────────────────────────────────────
// 5. Boş / undefined nested — crash olmamalı
// ─────────────────────────────────────────────────────────────
describe("Edge case: empty / undefined nested", () => {
    it("handles undefined itemList gracefully", () => {
        const result = applySortNestedItems(undefined, true);
        expect(result).toBeUndefined();
    });

    it("handles empty array", () => {
        const result = applySortNestedItems([], true);
        expect(result).toEqual([]);
        expect(result!.length).toBe(0);
    });

    it("handles single item array", () => {
        const single: SideBarItem[] = [{ title: "Only" }];
        const result = applySortNestedItems(single, true)!;
        expect(result.length).toBe(1);
        expect(result[0].title).toBe("Only");
    });
});

// ─────────────────────────────────────────────────────────────
// 6. Aynı başlık (duplicate) — kaybolma/çakışma olmamalı
// ─────────────────────────────────────────────────────────────
describe("Edge case: duplicate titles", () => {
    it("preserves all items with same title (no items lost)", () => {
        const items: SideBarItem[] = [
            { title: "Alpha", icon: "mdi-one" },
            { title: "Alpha", icon: "mdi-two" },
            { title: "Beta", icon: "mdi-three" },
        ];

        const sorted = applySortNestedItems(items, true)!;

        expect(sorted.length).toBe(3);
        expect(sorted[0].title).toBe("Alpha");
        expect(sorted[1].title).toBe("Alpha");
        expect(sorted[2].title).toBe("Beta");
    });
});

// ─────────────────────────────────────────────────────────────
// 7. Case / locale hassasiyeti — crash olmamalı, tüm öğeler
//    korunmalı (sıra locale'a bağlı olabilir)
// ─────────────────────────────────────────────────────────────
describe("Edge case: case sensitivity (localeCompare behavior)", () => {
    it("sorts mixed case without crashing, all items preserved", () => {
        const items: SideBarItem[] = [
            { title: "banana" },
            { title: "Apple" },
            { title: "cherry" },
        ];

        const sorted = applySortNestedItems(items, true)!;

        // Exact order depends on locale — only assert no crash + all items present
        expect(sorted.length).toBe(3);
        const titles = sorted.map(x => x.title);
        expect(titles).toContain("Apple");
        expect(titles).toContain("banana");
        expect(titles).toContain("cherry");
    });

    it("handles special characters without crashing", () => {
        const items: SideBarItem[] = [
            { title: "Über" },
            { title: "Ångström" },
            { title: "Zebra" },
        ];

        expect(() => applySortNestedItems(items, true)).not.toThrow();
        const sorted = applySortNestedItems(items, true)!;
        expect(sorted.length).toBe(3);
    });
});

// ─────────────────────────────────────────────────────────────
// 8. Derin nested (recursive) — sorting her nested seviyede
//    bağımsız uygulanır, top-level asla sıralanmaz
// ─────────────────────────────────────────────────────────────
describe("Deep nesting (multi-level)", () => {
    it("sorting applies to each nested itemList level (top-level unchanged)", () => {
        const topLevel: SideBarItem[] = [
            {
                title: "Zebra",
                itemList: [
                    { title: "C-deep" },
                    { title: "A-deep" },
                    { title: "B-deep", itemList: [{ title: "2" }, { title: "1" }] },
                ],
            },
            { title: "Alpha" },
        ];

        // Top-level order is unchanged (component does NOT sort top-level)
        expect(topLevel.map(x => x.title)).toEqual(["Zebra", "Alpha"]);

        // Level-1 nested sorted
        const l1 = applySortNestedItems(topLevel[0].itemList, true)!;
        expect(l1.map(x => x.title)).toEqual(["A-deep", "B-deep", "C-deep"]);

        // Level-2 nested sorted (inside B-deep)
        const bItem = l1.find(x => x.title === "B-deep")!;
        const l2 = applySortNestedItems(bItem.itemList as SideBarItem[] | undefined, true)!;
        expect(l2.map(x => x.title)).toEqual(["1", "2"]);
    });
});
