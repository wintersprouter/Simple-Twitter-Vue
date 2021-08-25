<template>
  <v-app>
    <v-main>
      <router-view v-if="isRouterAlive" />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
.v-main {
  width: 75%;
  margin: 0 auto 3rem auto;
}
</style>
