<template>
  <v-container>
    <v-row>
      <section class="left-section">
        <Navbar @after-post-tweet="updateTweet" />
      </section>
      <section class="middle-section">
        <ProfileLoading v-if="!isLoading" />
        <template v-else>
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
          <UserProfileInfo
            :initial-user="user"
            @after-build-followship="afterBuildFollowship"
          />
        </template>
        <v-tabs>
          <v-tab :to="`/users/${this.$route.params.id}/tweets`"> 推文 </v-tab>
          <v-tab :to="`/users/${this.$route.params.id}/repliedTweets`">
            推文與回覆
          </v-tab>
          <v-tab :to="`/users/${this.$route.params.id}/likedTweets`">
            喜歡的內容
          </v-tab>
        </v-tabs>
        <router-view />
      </section>
      <section class="right-section">
        <FollowRecommendations
          :initial-top-users="topUsers"
          @after-build-top-followhip="afterBuildTopFollowship"
          @after-remove-top-followhip="afterRemoveTopFollowship"
        />
      </section>
    </v-row>
  </v-container>
</template>
<script>
import Navbar from "./../components/Navbar";
import FollowRecommendations from "./../components/FollowRecommendations";
import UserProfileInfo from "./../components/UserProfileInfo";
import { mapState } from "vuex";
import usersAPI from "./../apis/users.js";
import { Toast } from "./../utils/helpers";
import ProfileLoading from "./../components/ProfileLoading.vue";

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
      isLoading: false,
    };
  },
  components: {
    Navbar,
    FollowRecommendations,
    UserProfileInfo,
    ProfileLoading,
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
    afterBuildFollowship() {
      this.$store.dispatch("fetchTopUsers");
    },
    afterBuildTopFollowship(topUserId) {
      const { id } = this.$route.params;
      if (parseInt(id) === this.currentUser.id) {
        this.user.followingCount += 1;
      } else if (topUserId === parseInt(id)) {
        this.user.isFollowed = true;
        this.user.followerCount += 1;
      }
    },
    afterRemoveTopFollowship(topUserId) {
      const { id } = this.$route.params;
      if (parseInt(id) === this.currentUser.id) {
        this.user.followingCount -= 1;
      } else if (topUserId === parseInt(id)) {
        this.user.isFollowed = false;
        this.user.followerCount -= 1;
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
