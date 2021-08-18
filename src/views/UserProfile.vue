<template>
  <v-container>
    <v-row>
      <section class="left-section"><Navbar /></section>
      <section class="middle-section">
        <v-card elevation="0" height="55px">
          <v-container class="d-flex pt-1">
            <v-btn icon @click="$router.back()">
              <v-icon color="black">mdi-arrow-left</v-icon>
            </v-btn>
            <p class="ml-3">
              <v-list-item-title class="header-user-title">{{
                this.name
              }}</v-list-item-title>
              <v-list-item-subtitle class="header-user-subtitle"
                >{{ this.tweetCount }} 推文
              </v-list-item-subtitle>
            </p>
          </v-container>
        </v-card>
        <v-divider></v-divider>
        <UserProfileInfo :initial-user="user" /><UserProfileNav />
        <router-view></router-view>
        <!-- <v-divider></v-divider><UserTweets /> -->
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
import UserProfileInfo from "./../components/UserProfileInfo";
import UserProfileNav from "./../components/UserProfileNav";
// import UserTweets from "./../components/UserTweets";
import { mapState } from "vuex";
import usersAPI from "./../apis/users.js";
import { Toast } from "./../utils/helpers";

export default {
  name: "UserProfile",
  data() {
    return {
      user: {
        account: "",
        avatar: "",
        cover: "",
        email: "",
        followerCount: 0,
        followingCount: 0,
        id: -1,
        introduction: "",
        isFollowed: false,
        name: "",
      },
      name: "",
      tweetCount: 0,
    };
  },
  components: {
    Navbar,
    FollowRecommendations,
    UserProfileInfo,
    UserProfileNav,
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
        const {
          account,
          avatar,
          cover,
          email,
          followerCount,
          followingCount,
          id,
          introduction,
          isFollowed,
          name,
          tweetCount,
        } = data;
        this.user = {
          account,
          avatar,
          cover,
          email,
          followerCount,
          followingCount,
          id,
          introduction,
          isFollowed,
          name,
        };
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
  },
};
</script>
<style lang="scss">
@import "./../assets/scss/layout/ThreeColumn.scss";
</style>
