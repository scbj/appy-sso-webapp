/**
 * Removes all excess whitespaces.
 * @param {String} value The string value to clean.
 */
export function cleanWhitespaces (value) {
  return value && value.replace(/\s+/g, ' ').trim()
}

export function snakeCaseToCamelCase (value) {
  const lower = value.toLowerCase()
  return lower.replace(/_\w/g, m => m[1].toUpperCase())
}
