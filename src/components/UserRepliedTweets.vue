<template>
  <section>
    <RepliedTweetsLoading v-if="isLoading" />
    <template v-else>
      <UserRepliedTweetsCard
        v-for="tweet in tweets"
        :key="tweet.replyId"
        :initial-tweet="tweet"
      />
      <v-card
        elevation="0"
        v-if="!tweets.length"
        class="message-card mt-0"
        max-width="600px"
      >
        <v-card-title>This account haven’t any replies. </v-card-title>
      </v-card>
    </template>
  </section>
</template>
<script>
import UserRepliedTweetsCard from "./UserRepliedTweetsCard";
import userAPI from "../apis/users";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";
import RepliedTweetsLoading from "./RepliedTweetsLoading";

export default {
  name: "UserRepliedTweets",
  data() {
    return {
      tweets: [],
      isProcessing: false,
      isLoading: false,
    };
  },
  components: {
    UserRepliedTweetsCard,
    RepliedTweetsLoading,
  },
  methods: {
    async fetchUserRepliedTweets(userId) {
      try {
        this.isLoading = true;
        const { data } = await userAPI.users.getUserRepliedTweets(userId);
        this.tweets = data;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得使用者回覆過的推文資料，請稍後再試",
        });
        console.log("error", error);
      }
    },
  },
  created() {
    const { id } = this.$route.params;
    this.fetchUserRepliedTweets(id);
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchUserRepliedTweets(to.params.id);
    next();
  },
};
</script>
<style lang="scss" scoped >
.message-card {
  border-bottom: 1px solid #e6ecf0;
}
</style>
