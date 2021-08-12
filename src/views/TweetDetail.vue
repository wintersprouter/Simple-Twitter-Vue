<template>
  <v-main>
    <v-container>
      <v-row>
        <section class="left-section"><Navbar /></section>
        <section class="middle-section"><UserTweet /></section>
        <section class="right-section"><FollowRecommendations /></section>
      </v-row>
    </v-container>
  </v-main>
</template>
<script>
import Navbar from "./../components/Navbar";
import FollowRecommendations from "./../components/FollowRecommendations";
import UserTweet from "./../components/UserTweet";

export default {
  name: "TweetDetail",
  components: {
    Navbar,
    UserTweet,
    FollowRecommendations,
  },
};
</script>
