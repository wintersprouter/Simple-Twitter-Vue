<template>
  <v-container>
    <v-row>
      <section class="left-section">
        <Navbar @after-post-tweet="updateTweet" />
      </section>
      <section class="middle-section">
        <v-card elevation="0" height="55px">
          <v-container class="d-flex pt-1">
            <v-btn icon @click="$router.back()">
              <v-icon color="black">mdi-arrow-left</v-icon>
            </v-btn>
            <p class="ml-3">
              <v-list-item-title class="header-user-title">{{
                name
              }}</v-list-item-title>
              <v-list-item-subtitle class="header-user-subtitle"
                >{{ tweetCount }} 推文
              </v-list-item-subtitle>
            </p>
          </v-container>
        </v-card>

        <v-tabs>
          <v-tab :to="`/users/${this.$route.params.id}/followship/follower`">
            跟隨者
          </v-tab>
          <v-tab :to="`/users/${this.$route.params.id}/followship/following`">
            跟隨中
          </v-tab>
        </v-tabs>
        <v-divider></v-divider>
        <router-view></router-view>
      </section>
      <section class="right-section">
        <FollowRecommendations :initial-top-users="topUsers" />
      </section>
    </v-row>
  </v-container>
</template>
<script>
import Navbar from "./../components/Navbar";
import FollowRecommendations from "./../components/FollowRecommendations";
import { mapState } from "vuex";
import usersAPI from "./../apis/users.js";
import { Toast } from "./../utils/helpers";

export default {
  name: "Followship",
  components: {
    Navbar,
    FollowRecommendations,
  },
  data() {
    return {
      name: "",
      tweetCount: 0,
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated", "topUsers"]),
  },
  created() {
    const { id } = this.$route.params;
    this.fetchProfileInfo(id);
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchProfileInfo(to.params.id);
    next();
  },
  methods: {
    async fetchProfileInfo(userId) {
      try {
        const { data } = await usersAPI.users.getProfile(userId);
        const { name, tweetCount } = data;

        this.name = name;
        this.tweetCount = tweetCount;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料，請稍後再試",
        });
        console.log("error", error);
      }
    },
    updateTweet() {
      const { id } = this.$route.params;
      if (parseInt(id) === this.currentUser.id) {
        this.tweetCount += 1;
      }
    },
  },
};
</script>
<style lang="scss">
@import "./../assets/scss/layout/ThreeColumn.scss";
</style>
