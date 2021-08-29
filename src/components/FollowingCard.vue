<template>
  <v-card elevation="0" tile class="mt-0" max-width="600px">
    <v-container class="d-flex justify-space-between">
      <router-link :to="`/users/${follow.followingId}`" class="links">
        <v-avatar size="50" class="tweet-card-avatar">
          <img :src="follow.avatar" :alt="follow.name" />
        </v-avatar>
      </router-link>

      <v-card-text class="py-0">
        <v-list-item-title class="followship-user-name mb-1">{{
          follow.name
        }}</v-list-item-title>
        <v-list-item-subtitle class="followship-user-account"
          >@{{ follow.account }}</v-list-item-subtitle
        >
        <v-list-item-content class="followship-intro pb-0 pt-1">
          {{ follow.introduction }}
        </v-list-item-content>
      </v-card-text>
      <v-btn
        v-if="follow.isFollowed && follow.followingId !== currentUser.id"
        @click.stop.prevent="unfollow(follow.followingId)"
        elevation="0"
        color="primary"
        class="text-no-wrap rounded-pill px-4"
        :disabled="isProcessing"
        >正在跟隨</v-btn
      >
      <v-btn
        v-if="!follow.isFollowed && follow.followingId !== currentUser.id"
        @click.stop.prevent="addFollow(follow.followingId)"
        outlined
        color="primary"
        class="text-no-wrap rounded-pill px-4"
        :disabled="isProcessing"
        >跟隨</v-btn
      >
    </v-container>
    <v-divider></v-divider>
  </v-card>
</template>
<script>
import { mapState } from "vuex";
import followshipsAPI from "./../apis/followships";
import { Toast } from "./../utils/helpers";

export default {
  name: "FollowingCard",
  props: {
    initialFollow: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      follow: this.initialFollow,
      isProcessing: false,
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  methods: {
    async addFollow(followingId) {
      try {
        this.isProcessing = true;
        const { data } = await followshipsAPI.follow({ followingId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        Toast.fire({
          icon: "success",
          title: `${data.message}`,
        });

        this.follow.isFollowed = true;
        this.isProcessing = false;
        this.$emit("after-build-followship");
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法加入追蹤，請稍後再試",
        });
      }
    },
    async unfollow(followingId) {
      try {
        this.isProcessing = true;
        const { data } = await followshipsAPI.unfollow({ followingId });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.follow.isFollowed = false;
        this.isProcessing = false;
        Toast.fire({ icon: "success", title: `${data.message}` });
        this.isProcessing = false;
        this.$emit("after-build-followship");
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({ icon: "error", title: "無法移除追蹤，請稍後再試" });
      }
    },
  },
};
</script>
