// TODO: Refactoriser toute lapartie "validator", it's a 💩

import StringValidator from './string-validator'
import i18n from '@/i18n'

const validators = {
  fullName: validateFullName,
  email: validateEmail
}

/**
 * @typedef {Object} ErrorObject
 * @property {String} title The title of the error
 * @property {String} description The complete reason for the error
 */

/**
 * Creates an object using the specified keys to retrieve the corresponding i18n resources.
 * @param {String} titleKey
 * @param {String} descriptionKey
 * @returns {ErrorObject}
 */
function createErrorObject (titleKey, descriptionKey) {
  return {
    title: i18n.t(titleKey),
    description: i18n.t(descriptionKey)
  }
}

/**
 * Validate the full name field of a user.
 * @param {String} fullName
 * @returns {Boolean | ErrorObject}
 */
export function validateFullName (fullName) {
  const validate = () => {
    const words = fullName.split(' ')
    const invalid =
      // The full name must contain at least two words
      words.length < 2 ||
      // Each word must contain at least two letters
      words.some(w => w.length < 2)

    if (invalid) {
      return false
    }
    const validator = new StringValidator(fullName)
      .alphabetic()
      .min(5)
      .max(60)

    return !!validator.result
  }

  return validate()
    ? true
    : createErrorObject('alert.invalidFullName', 'message.invalidFullName')
}
/**
 * Validate the email field of a user.
 * @param {String} email
 * @returns {Boolean | ErrorObject}
 */
export function validateEmail (email) {
  return /^[\w.-]+@[\w-]+\.+[a-zA-Z]{2,16}$/.test(email)
    ? true
    : createErrorObject('alert.invalidEmail', 'message.invalidEmail')
}

/**
 * Validate all fields of the specified object.
 * @param {Object} obj The object that contains all the fields to validate
 * @returns {Array<ErrorObject>}
 */
export function validate (obj) {
  const errorObjectOnly = value =>
    typeof value === 'object'

  const validateSingleField = key => {
    return key in validators && key in obj
      ? validators[key](obj[key])
      : createErrorObject('alert.unknownField', 'message.unknownField')
  }

  return Object
    .keys(obj)
    .map(validateSingleField)
    .filter(errorObjectOnly)
}
