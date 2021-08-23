<template>
  <v-container>
    <v-row>
      <section class="left-section"><Navbar /></section>
      <section class="main-section">
        <v-card elevation="0" height="55px">
          <v-card-title class="header-title">使用者列表</v-card-title>
        </v-card>
        <v-divider></v-divider>
        <router-view></router-view>
      </section>
    </v-row>
  </v-container>
</template>
<script>
import Navbar from "./../components/Navbar";
import { mapState } from "vuex";

export default {
  name: "AdminMain",
  components: {
    Navbar,
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
};
</script>
<style lang="scss">
@import "./../assets/scss/layout/TwoColumn.scss";
</style>
