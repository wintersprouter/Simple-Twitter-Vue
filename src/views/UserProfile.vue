<template>
  <v-container>
    <v-row>
      <section class="left-section"><Navbar /></section>
      <section class="middle-section">
        <UserProfileInfo /><UserProfileNav /><UserTweets />
      </section>
      <section class="right-section"><FollowRecommendations /></section>
    </v-row>
  </v-container>
</template>
<script>
import Navbar from "./../components/Navbar";
import FollowRecommendations from "./../components/FollowRecommendations";
import UserProfileInfo from "./../components/UserProfileInfo";
import UserProfileNav from "./../components/UserProfileNav";
import UserTweets from "./../components/UserTweets";

export default {
  name: "Home",
  components: {
    Navbar,
    FollowRecommendations,
    UserProfileInfo,
    UserProfileNav,
    UserTweets,
  },
};
</script>
<style lang="scss">
@import "./../assets/scss/layout/ThreeColumn.scss";
</style>
