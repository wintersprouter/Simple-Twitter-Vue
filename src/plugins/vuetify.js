import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  breakpoint: {
    scrollBarWidth: 16,
    thresholds: {
      xs: 479,
      sm: 768,
      md: 1024,
      lg: 1440
    }
  },
  theme: {
    dark: false,
    default: 'light',
    disable: false,
    themes: {
      light: {
        primary: '#1da1f2',
        secondary: '#F5F8FA',
        accent: '#1C1C1C',
        outline: '#CCD6DD',
        gary: '#657786',
        pink: '#E0245E'
      }
    }
  }
})
