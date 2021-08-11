import Vue from 'vue'
import 'vuetify/dist/vuetify.min.css'
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
        primary: '#ff6600',
        secondary: '#F5F8FA',
        accent: '#1C1C1C',
        outline: '#CCD6DD'
      }
    }
  }
})
