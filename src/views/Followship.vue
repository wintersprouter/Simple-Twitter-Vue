<template>
  <div class="main-container d-flex pa-0">
    <section class="left-section">
      <Navbar @after-post-tweet="updateTweet" />
    </section>
    <section class="middle-section">
      <HeaderLoading v-if="isLoading" />
      <v-card v-else elevation="0" height="55px " tile class="mt-0 header-card">
        <v-container class="d-flex p-0">
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

      <v-tabs class="mt-2">
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
  </div>
</template>
<script>
import Navbar from "./../components/Navbar";
import FollowRecommendations from "./../components/FollowRecommendations";
import { mapState } from "vuex";
import usersAPI from "./../apis/users.js";
import { Toast } from "./../utils/helpers";
import HeaderLoading from "./../components/HeaderLoading";

export default {
  name: "Followship",
  components: {
    Navbar,
    FollowRecommendations,
    HeaderLoading,
  },
  data() {
    return {
      name: "",
      tweetCount: 0,
      isLoading: false,
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
        this.isLoading = true;
        const { data } = await usersAPI.users.getProfile(userId);
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        const { name, tweetCount } = data;

        this.name = name;
        this.tweetCount = tweetCount;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料，請稍後再試",
        });
        this.$router.push("/404");
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
