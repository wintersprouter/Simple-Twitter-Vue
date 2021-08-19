<template>
  <v-card elevation="0">
    <v-container class="d-flex justify-space-between">
      <router-link :to="`/users/${follow.followingId}`" class="links">
        <v-avatar size="50" class="tweet-card-avatar">
          <img :src="follow.avatar" :alt="follow.name" />
        </v-avatar>
      </router-link>

      <v-card-text class="py-0">
        <v-list-item-title class="followship-name mb-1">{{
          follow.name
        }}</v-list-item-title>
        <v-list-item-subtitle class="followship-account"
          >@{{ follow.account }}</v-list-item-subtitle
        >
        <v-list-item-content class="followship-intro pb-0 pt-1">
          {{ follow.introduction }}
        </v-list-item-content>
      </v-card-text>
      <v-btn
        v-if="follow.isFollowed && follow.id !== currentUser.id"
        @click.stop.prevent="unfollow(follow.id)"
        elevation="0"
        color="primary"
        class="text-no-wrap rounded-pill px-4"
        :disabled="isProcessing"
        >正在跟隨</v-btn
      >
      <v-btn
        v-if="!follow.isFollowed && follow.id !== currentUser.id"
        @click.stop.prevent="follow(follow.id)"
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
export default {
  name: "FollowshipCard",
  props: {
    initialFollow: {
      type: Object,
      require: true,
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
};
</script>
<style lang="scss">
@import "../assets/scss/components/_FollowshipCard.scss";
</style>
