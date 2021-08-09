import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  breakpoint: {
    scrollBarWidth: 16,
    thresholds: {
      xs: 600,
      sm: 960,
      md: 1280,
      lg: 1920
    }
  },
  theme: {
    dark: false,
    default: 'light',
    disable: false,
    themes: {
      light: {
        primary: '#1DA1F2',
        secondary: '#F5F8FA',
        accent: '#1C1C1C'
      }
    }
  }
})
