<template>
  <v-container>
    <v-row>
      <section class="left-section"><Navbar /></section>
      <section class="middle-section">
        <v-card elevation="0" height="55px">
          <v-container class="d-flex p-0">
            <v-btn icon onclick="history.back()">
              <v-icon color="black">mdi-arrow-left</v-icon>
            </v-btn>
            <v-card-title class="header-title py-0">推文</v-card-title>
          </v-container>
        </v-card>
        <v-divider></v-divider><UserTweet /> <v-divider></v-divider
        ><Replies /><v-divider></v-divider>
      </section>
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
