<template>
  <section>
    <FollowshipCard
      v-for="following in followings"
      :key="following.id"
      :initial-follow="following"
      :message="message"
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
      message: "",
    };
  },
  components: {
    FollowshipCard,
  },
  methods: {
    async fetchUserFollowings(userId) {
      try {
        const { data } = await userAPI.users.getUserFollowings(userId);

        if (data.message !== undefined) {
          this.message = data.message;
          console.log(this.message);
          this.followings = [];
          return;
        }
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

