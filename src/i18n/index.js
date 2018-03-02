import Vue from 'vue'
import VueI18n from 'vue-i18n'
import * as messages from './lang'
import config from '@/plugin.config'

Vue.use(VueI18n)

const navigatorLanguage = navigator.language || navigator.userLanguage || ''
export const defaultLocale = navigatorLanguage.substr(0, 2)

// for more info (pluralization, date time localization..etc) refer
// to the doc (http://kazupon.github.io/vue-i18n/en/) 🌍
export const i18n = new VueI18n({
  ...config.i18n,
  locale: defaultLocale,
  messages
})

/**
 * Changes the locale configuration of the instance of VueI18n.
 * @param {string} locale Ex: fr or en
 */
export function changeLocale (locale) {
  if (!i18n.messages.hasOwnProperty(locale)) {
    console.log(`'${locale}' doesn't exist`)
    return false
  }

  i18n.locale = locale
  return true
}
