module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/sass/main.scss";
        `
      }
    }
  }
}
