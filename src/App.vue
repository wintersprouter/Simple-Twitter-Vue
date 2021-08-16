<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({}),
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
.v-main {
  width: 75%;
  margin: 0 auto 3rem auto;
}
</style>
