import { i18n } from '@/i18n'

/**
 * Returns a message object ready to be display.
 * @param {String} resourceName The i18n resource name
 */
export function buildMessage (resourceName) {
  return {
    message: i18n.t(`message.${resourceName}`),
    type: deduceTypeFromName(resourceName)
  }
}

/**
 * Returns the type of the message based on the name of the specified resource.
 * @param {String} resourceName
 * @returns {String}
 */
function deduceTypeFromName (resourceName) {
  const success = /.*(success|Success)$/
  const warning = /.*(warning|Warning)$/
  const error = /.*(error|Error)$/

  if (success.test(resourceName)) {
    return 'success'
  } else if (warning.test(resourceName)) {
    return 'warning'
  } else if (error.test(resourceName)) {
    return 'error'
  }

  return 'info'
}
