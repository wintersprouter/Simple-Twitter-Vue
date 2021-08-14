<template>
  <v-container>
    <v-row>
      <section class="left-section"><Navbar /></section>
      <section class="middle-section">
        <v-card elevation="0" height="55px">
          <v-container class="d-flex pt-1">
            <v-btn icon>
              <v-icon color="black">mdi-arrow-left</v-icon>
            </v-btn>
            <v-text class="ml-3">
              <v-list-item-title class="header-user-title"
                >John Doe</v-list-item-title
              >
              <v-list-item-subtitle class="header-user-subtitle"
                >25 推文
              </v-list-item-subtitle>
            </v-text>
          </v-container>
        </v-card>
        <v-divider></v-divider>
        <UserProfileInfo /><UserProfileNav /> <v-divider></v-divider
        ><UserTweets />
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
  name: "UserProfile",
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
