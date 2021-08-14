<template>
  <v-container>
    <v-row>
      <section class="left-section"><Navbar /></section>
      <section class="middle-section">
        <v-card elevation="0" height="55px"
          ><v-card-title class="header-title">首頁</v-card-title></v-card
        >
        <v-divider></v-divider>
        <v-card elevation="0">
          <v-form>
            <v-container class="d-flex justify-space-between px-4 pt-4 pb-0">
              <v-avatar size="50" class="mr-5">
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="MasterCard"
                />
              </v-avatar>
              <v-textarea
                :rules="rules"
                :value="value"
                counter
                maxlength="150"
                auto-grow
                row-height="5"
                placeholder="有什麼新鮮事？"
                class="pt-2"
              ></v-textarea>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                rounded
                elevation="0"
                class="mt-0 mb-2 mr-3"
              >
                推文
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
        <v-divider></v-divider>
        <UserTweets />
      </section>
      <section class="right-section"><FollowRecommendations /></section>
    </v-row>
  </v-container>
</template>

<script>
import Navbar from "./../components/Navbar";
import FollowRecommendations from "./../components/FollowRecommendations";
import UserTweets from "./../components/UserTweets";

export default {
  name: "Home",
  components: {
    Navbar,
    UserTweets,
    FollowRecommendations,
  },
};
</script>
<style lang="scss">
@import "./../assets/scss/layout/ThreeColumn.scss";
</style>
