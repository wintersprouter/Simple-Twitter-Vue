<template>
  <v-container>
    <v-row>
      <section class="left-section"><Navbar /></section>
      <section class="middle-section">
        <UserProfileInfo /><UserProfileNav /><UserRepiedTweets />
      </section>
      <section class="right-section"><FollowRecommendations /></section>
    </v-row>
  </v-container>
</template>
<script>
import UserRepiedTweets from "../components/UserRepiedTweets.vue";
import Navbar from "./../components/Navbar";
import FollowRecommendations from "./../components/FollowRecommendations";
import UserProfileInfo from "./../components/UserProfileInfo";
import UserProfileNav from "./../components/UserProfileNav";
export default {
  name: "UserProfileRepied",
  components: {
    Navbar,
    FollowRecommendations,
    UserProfileInfo,
    UserProfileNav,
    UserRepiedTweets,
  },
};
</script>
<style lang="scss">
@import "./../assets/scss/layout/ThreeColumn.scss";
</style>
