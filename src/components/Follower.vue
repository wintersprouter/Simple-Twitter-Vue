<template>
  <section>
    <FollowerCard
      v-for="follower in followers"
      :key="follower.followerId"
      :initial-follow="follower"
      @after-build-followship="afterBuildFollowship"
    />
  </section>
</template>

<script>
import FollowerCard from "./FollowerCard.vue";
import userAPI from "../apis/users";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  name: "Follower",
  data() {
    return {
      followers: [],
      isProcessing: false,
      message: "",
    };
  },
  components: {
    FollowerCard,
  },
  methods: {
    async fetchUserFollowers(userId) {
      try {
        const { data } = await userAPI.users.getUserFollowers(userId);

        this.followers = data;
      } catch (error) {
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
