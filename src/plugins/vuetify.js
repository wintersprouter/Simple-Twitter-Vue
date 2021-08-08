import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#1DA1F2',
        secondary: '#F5F8FA',
        accent: '#657786',
        font: ' #1C1C1C'
      }
    }
  }
})
