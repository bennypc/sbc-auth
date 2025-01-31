import VueI18n, { LocaleMessages } from 'vue-i18n'
import { castToVueI18n, createI18n } from 'vue-i18n-bridge/dist/vue-i18n-bridge.esm-bundler'
import Vue from 'vue'

Vue.use(VueI18n, { bridge: true })

function loadLocaleMessages (): LocaleMessages {
  const locales = require.context('../locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages: LocaleMessages = {}
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

const i18n = castToVueI18n(createI18n({
  legacy: false,
  warnHtmlMessage: false,
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages()
}, VueI18n))

export default i18n
