/**
 * Removes all excess whitespaces.
 * @param {String} value The string value to clean.
 */
export function cleanWhitespaces (value) {
  return value && value.replace(/\s+/g, ' ').trim()
}
