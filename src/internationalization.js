import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

// for more info (pluralization, date time localization..etc) refer
// to the doc (http://kazupon.github.io/vue-i18n/en/)
export const i18n = new VueI18n({
  locale: 'fr',
  silentTranslationWarn: true,
  messages: {
    en: {
      alert: {
        username: 'Please enter your username',
        password: 'Please enter your password'
      }
    },
    fr: {
      alert: {
        username: 'Veuillez renseigner votre nom d\'utilisateur',
        password: 'Veuillez renseigner votre mot de passe'
      }
    }
  }
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
