/**
 * Sorts an array alphabetically according to the specified attribute.
 * @param {Array} array
 * @param {String} property
 */
export function sortAlphabetically (array, property) {
  const compare = (a, b) => {
    const nameA = a[property] && a[property].toLowerCase()
    const nameB = b[property] && b[property].toLowerCase()
    if (nameA > nameB) return 1
    else if (nameA < nameB) return -1

    // No difference between the two
    return 0
  }
  const clonedArray = [...array]
  return clonedArray.sort(compare)
}
