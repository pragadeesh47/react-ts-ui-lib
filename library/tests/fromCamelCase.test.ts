import { fromCamelCase } from "../utilities/fromCamelCase";

describe("fromCamelCase", () => {
  it("converts camelCase to space-separated words", () => {
    expect(fromCamelCase("helloWorld")).toBe("hello World");
  });
});
