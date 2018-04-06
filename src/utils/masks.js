/**
 * Returns the formatted value of the license.
 * @param {String} value
 */
export function licenceMask (value) {
  const alphanumeric = char => /^[a-zA-Z0-9]+$/.test(char)

  // We must keep only alphanumeric characters
  const licence = value
    .split('')
    .filter(alphanumeric)
  const masked = []
  const triggerLengths = [ 8, 13, 18, 23 ]

  // Iterate on the characters to construct the license
  for (let i = 0; i < licence.length; i++) {
    // Limit the maximum number of characters
    if (masked.length === 36) { break }
    if (triggerLengths.includes(masked.length)) {
      masked.push('-')
    }
    masked.push(licence[i])
  }

  // Join all characters in a single string
  return masked.join('')
}
