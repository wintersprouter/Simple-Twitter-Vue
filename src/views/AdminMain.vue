<template>
  <v-container>
    <v-row>
      <section class="left-section"><Navbar /></section>
      <section class="main-section">
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
