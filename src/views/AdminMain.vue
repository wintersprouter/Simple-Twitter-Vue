<template>
  <div class="main-container d-flex pa-0">
    <section class="left-section"><Navbar /></section>
    <section class="main-section">
      <router-view></router-view>
    </section>
  </div>
</template>
<script>
import Navbar from "./../components/Navbar";
import { mapState } from "vuex";

export default {
  name: "AdminMain",
  components: {
    Navbar,
  },
  data() {
    return {
      page: "",
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
};
</script>
<style lang="scss">
.header-card {
  width: 100%;
}
</style>
