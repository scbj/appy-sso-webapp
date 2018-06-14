import { i18n } from '@/i18n'
import { cleanWhitespaces } from '@/utils/string-helpers'

/**
 * @typedef {Object} ValidationResponse
 * @property {Boolean} success
 * @property {Error} [error]
 */

/**
 * Create validation error object with the value of the specified resource.
 * @param {String} resourceName
 * @returns {ValidationResponse}
 */
function createValidationError (resourceName) {
  const message = i18n.t(`error.${resourceName}`)
  return {
    success: false,
    error: new Error(message)
  }
}

export const group = {
  name: {
    /**
     * Validates the specified string as a group name.
     * @param {String} groupName
     * @returns {ValidationResponse}
     */
    validate (groupName) {
      groupName = cleanWhitespaces(groupName)

      if (!groupName) {
        return createValidationError('atLeastOneCharacter')
      } else if (groupName.length > 60) {
        return createValidationError('atMostSixtyCharacters')
      }

      return { success: true }
    }
  }
}

export default {
  group
}
