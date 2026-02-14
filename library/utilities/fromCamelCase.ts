/**
 * Converts a camelCase string to space-separated words.
 * Inserts a space before each uppercase letter that follows a lowercase letter.
 * @param str - camelCase string (e.g. "helloWorld")
 * @returns string with words separated by spaces (e.g. "hello World")
 */
export const fromCamelCase = (str: string): string => {
  if (typeof str !== "string") return "";
  return str.replace(/([a-z])([A-Z])/g, "$1 $2").trim();
};
