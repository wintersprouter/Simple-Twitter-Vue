<template>
  <section>
    <UserTweets
      v-for="tweet in tweets"
      :key="tweet.id"
      :initial-tweet="tweet"
    />
  </section>
</template>

<script>
import UserTweets from "./../components/UserTweets";
import userAPI from "../apis/users";
import { Toast } from "./../utils/helpers";

import { mapState } from "vuex";
export default {
  name: "UserProfileTweets",
  data() {
    return {
      tweets: [],
      isProcessing: false,
    };
  },
  components: {
    UserTweets,
  },

  methods: {
    async fetchUserTweets(userId) {
      try {
        const { data } = await userAPI.users.getUserTweets(userId);
        this.tweets = data;
      } catch (error) {
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
<style lang="scss" >
@import "./../assets/scss/components/_UserTweets.scss";
</style>
