<template>
  <section>
    <UserRepliedTweetsCard
      v-for="tweet in tweets"
      :key="tweet.replyId"
      :initial-tweet="tweet"
    />
  </section>
</template>
<script>
import UserRepliedTweetsCard from "./UserRepliedTweetsCard";
import userAPI from "../apis/users";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  name: "UserRepliedTweets",
  data() {
    return {
      tweets: [],
      isProcessing: false,
    };
  },
  components: {
    UserRepliedTweetsCard,
  },
  methods: {
    async fetchUserRepliedTweets(userId) {
      try {
        const { data } = await userAPI.users.getUserRepliedTweets(userId);
        this.tweets = data;
      } catch (error) {
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
