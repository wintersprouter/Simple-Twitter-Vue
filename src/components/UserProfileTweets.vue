<template>
  <section>
    <TweetsLoading v-if="isLoading" />
    <template v-else>
      <UserTweets
        v-for="tweet in tweets"
        :key="tweet.id"
        :initial-tweet="tweet"
      />
      <v-card elevation="0" v-if="!tweets.length" class="message-card mt-0">
        <v-card-title>This account haven’t Tweeted. </v-card-title>
      </v-card>
    </template>
  </section>
</template>

<script>
import UserTweets from "./../components/UserTweets";
import userAPI from "../apis/users";
import { Toast } from "./../utils/helpers";
import TweetsLoading from "./../components/TweetsLoading";

import { mapState } from "vuex";
export default {
  name: "UserProfileTweets",
  data() {
    return {
      tweets: [],
      isProcessing: false,
      isLoading: false,
    };
  },
  components: {
    UserTweets,
    TweetsLoading,
  },

  methods: {
    async fetchUserTweets(userId) {
      try {
        this.isLoading = true;
        const { data } = await userAPI.users.getUserTweets(userId);
        this.tweets = data;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得推文資料，請稍後再試",
        });
        console.log("error", error);
      }
    },
  },
  created() {
    const { id } = this.$route.params;
    this.fetchUserTweets(id);
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchUserTweets(to.params.id);
    next();
  },
};
</script>
<style lang="scss" scoped >
.message-card {
  border-bottom: 1px solid #e6ecf0;
}
</style>
