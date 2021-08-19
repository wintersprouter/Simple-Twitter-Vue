<template>
  <section>
    <UserLikedTweetsCard
      v-for="tweet in tweets"
      :key="tweet.id"
      :initial-tweet="tweet"
    />
  </section>
</template>
<script>
import UserLikedTweetsCard from "./UserLikedTweetsCard.vue";
import userAPI from "../apis/users";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";
export default {
  name: "UserLikedTweets",
  data() {
    return {
      tweets: [],
      isProcessing: false,
    };
  },
  components: {
    UserLikedTweetsCard,
  },

  methods: {
    async fetchUserLikedTweets(userId) {
      try {
        const { data } = await userAPI.users.getUserLikedTweets(userId);
        this.tweets = data;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得喜歡的推文資料，請稍後再試",
        });
        console.log("error", error);
      }
    },
  },
  created() {
    const { id } = this.$route.params;
    this.fetchUserLikedTweets(id);
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchUserLikedTweets(to.params.id);
    next();
  },
};
</script>

