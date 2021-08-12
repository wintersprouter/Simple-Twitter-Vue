<template>
  <v-container>
    <v-row>
      <section class="left-section"><Navbar /></section>
      <section class="middle-section"><UserProfileInfo /></section>
      <section class="right-section"><FollowRecommendations /></section>
    </v-row>
  </v-container>
</template>
<script>
import Navbar from "./../components/Navbar";
import FollowRecommendations from "./../components/FollowRecommendations";
import UserProfileInfo from "./../components/UserProfileInfo";

export default {
  name: "Home",
  components: {
    Navbar,
    FollowRecommendations,
    UserProfileInfo,
  },
};
</script>
<style lang="scss">
@import "./../assets/scss/layout/ThreeColumn.scss";
</style>
