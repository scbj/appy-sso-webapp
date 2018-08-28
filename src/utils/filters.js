/**
 * Returns the calling string value converted to uppercase (the value will be converted to a string if it isn't one).
 * @param {String} value
 */
export function uppercase (value) {
  if (!value) return ''
  return value.toString().toUpperCase()
}
