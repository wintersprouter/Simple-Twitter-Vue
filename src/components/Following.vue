<template>
  <section>
    <TweetsLoading v-if="isLoading" />
    <template v-else>
      <FollowingCard
        v-for="following in followings"
        :key="following.followingId"
        :initial-follow="following"
        @after-build-followship="afterBuildFollowship"
      />
      <v-card elevation="0" v-if="message" class="message-card">
        <v-card-title>{{ this.message }}</v-card-title>
      </v-card>
    </template>
  </section>
</template>

<script>
import FollowingCard from "./FollowingCard.vue";
import userAPI from "../apis/users";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";
import TweetsLoading from "./../components/TweetsLoading.vue";

export default {
  name: "Following",
  data() {
    return {
      followings: [],
      isProcessing: false,
      message: "",
      isLoading: false,
    };
  },
  components: {
    FollowingCard,
    TweetsLoading,
  },
  methods: {
    async fetchUserFollowings(userId) {
      try {
        this.isLoading = true;
        const { data } = await userAPI.users.getUserFollowings(userId);
        if (data.message !== undefined) {
          this.message = data.message;
          this.followings = [];
          this.isLoading = false;
          return;
        }
        this.followings = data;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得使用者追蹤中的名單，請稍後再試",
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
    this.fetchUserFollowings(id);
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchUserFollowings(to.params.id);
    next();
  },
};
</script>
<style lang="scss" scoped>
.message-card {
  border-bottom: 1px solid #e6ecf0;
}
</style>
