<template>
  <section>
    <TweetsLoading v-if="isLoading" />
    <template v-else>
      <FollowerCard
        v-for="follower in followers"
        :key="follower.followerId"
        :initial-follow="follower"
        @after-build-followship="afterBuildFollowship"
      />
      <v-card
        elevation="0"
        v-if="message"
        class="message-card mt-0"
        max-width="600px"
      >
        <v-card-title>{{ this.message }}</v-card-title>
      </v-card>
    </template>
  </section>
</template>

<script>
import FollowerCard from "./FollowerCard.vue";
import userAPI from "../apis/users";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";
import TweetsLoading from "./../components/TweetsLoading.vue";

export default {
  name: "Follower",
  data() {
    return {
      followers: [],
      isProcessing: false,
      message: "",
      isLoading: false,
    };
  },
  components: {
    FollowerCard,
    TweetsLoading,
  },
  methods: {
    async fetchUserFollowers(userId) {
      try {
        this.isLoading = true;
        const { data } = await userAPI.users.getUserFollowers(userId);
        if (data.message !== undefined) {
          this.message = data.message;
          this.followers = [];
          this.isLoading = false;
          return;
        }

        this.followers = data;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得使用者追隨者的名單，請稍後再試",
        });
        console.log("error", error);
      }
    },
    afterBuildFollowship() {
      this.$store.dispatch("fetchTopUsers");
    },
  },
  created() {
    const { id } = this.$route.params;
    this.fetchUserFollowers(id);
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchUserFollowers(to.params.id);
    next();
  },
};
</script>
<style lang="scss" scoped>
.message-card {
  border-bottom: 1px solid #e6ecf0;
}
</style>
