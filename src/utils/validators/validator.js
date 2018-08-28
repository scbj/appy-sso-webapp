import i18n from '@/i18n'
import { cleanWhitespaces } from '@/utils/string'

/**
 * @typedef {Object} ValidationResponse
 * @property {Boolean} success
 * @property {Error} [error]
 */

/**
 * Create an Error object with the value of the specified resource.
 * @param {String} resourceName
 * @returns {Error}
 */
function createError (resourceName) {
  const message = i18n.t(`error.${resourceName}`)
  return new Error(message)
}

/**
 * Create validation response object with the value of the specified resource.
 * @param {Object} properties
 * @param {Boolean} properties.success
 * @param {String} properties.errorResourceName
 */
function createValidationResponse ({ success, errorResourceName }) {
  if (success) {
    return { success: true }
  }
  return {
    success: false,
    error: createError(errorResourceName)
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
        return createValidationResponse({ errorResourceName: 'atLeastOneCharacter' })
      } else if (groupName.length > 60) {
        return createValidationResponse({ errorResourceName: 'atMostSixtyCharacters' })
      }

      return { success: true }
    }
  }
}

export const user = {
  email: {
    validate (email) {
      const match = /^[\w.-]+@[\w-]+\.+[a-zA-Z]{2,16}$/.test(email)
      return createValidationResponse({
        success: match,
        errorResourceName: 'invalidEmail'
      })
    }
  }
}

export default {
  group,
  user
}
