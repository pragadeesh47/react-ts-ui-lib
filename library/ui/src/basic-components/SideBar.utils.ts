/**
 * Minimal type compatible with SideBarItem — defined inline
 * to avoid importing from a .tsx file (breaks jest ts-jest when --jsx is not set).
 */
type SortableSideBarItem = {
    title: string;
    [key: string]: unknown;
};

/**
 * Sorts a list of SideBarItem entries by their `title` property in ascending order.
 * Returns a new array (shallow copy) — the original array is never mutated.
 *
 * When `sortNestedItems` is false or undefined, the original array is returned as-is.
 *
 * @param items - The array of sidebar items to optionally sort.
 * @param sortNestedItems - Whether to apply alphabetical sorting.
 * @returns A sorted copy of the array, or the original array if sorting is disabled.
 */
export const applySortNestedItems = (
    items: SortableSideBarItem[] | undefined,
    sortNestedItems: boolean | undefined,
): SortableSideBarItem[] | undefined => {
    if (!items) return items;
    return sortNestedItems
        ? [...items].sort((a, b) => a.title.localeCompare(b.title))
        : items;
};
