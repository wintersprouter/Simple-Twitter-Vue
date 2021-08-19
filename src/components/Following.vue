<template>
  <section>
    <FollowshipCard
      v-for="following in followings"
      :key="following.id"
      :initial-follow="following"
    />
  </section>
</template>

<script>
import FollowshipCard from "./FollowshipCard.vue";
import userAPI from "../apis/users";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  name: "Following",
  data() {
    return {
      followings: [],
      isProcessing: false,
    };
  },
  components: {
    FollowshipCard,
  },
  methods: {
    async fetchUserFollowings(userId) {
      try {
        const { data } = await userAPI.users.getUserFollowings(userId);
        console.log(data);
        this.followings = data;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得使用者追蹤中的名單，請稍後再試",
        });
        console.log("error", error);
      }
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

