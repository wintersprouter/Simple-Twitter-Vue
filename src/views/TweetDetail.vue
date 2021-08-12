<template>
  <v-container>
    <v-row>
      <section class="left-section"><Navbar /></section>
      <section class="middle-section"><UserTweet /><Replies /></section>
      <section class="right-section"><FollowRecommendations /></section>
    </v-row>
  </v-container>
</template>
<script>
import Navbar from "./../components/Navbar";
import FollowRecommendations from "./../components/FollowRecommendations";
import Replies from "./../components/Replies";
import UserTweet from "./../components/UserTweet";

export default {
  name: "TweetDetail",
  components: {
    Navbar,
    UserTweet,
    Replies,
    FollowRecommendations,
  },
};
</script>
<style lang="scss">
@import "./../assets/scss/layout/ThreeColumn.scss";
</style>
