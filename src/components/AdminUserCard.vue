<template>
  <v-card color="#F6F7F8" class="admin-users-card">
    <v-img height="140px" :src="user.cover" :alt="user.name" class="image">
    </v-img>
    <v-avatar size="100" class="profile-avatar" :z-index="zIndex" absolute fab>
      <img
        class="profile-avatar-image image"
        :alt="user.name"
        :src="user.avatar"
      />
    </v-avatar>
    <v-container>
      <v-card-title class="admin-users-card-name mt-2">{{
        user.name
      }}</v-card-title>
      <v-card-title class="admin-users-card-account pt-1"
        >@{{ user.account }}</v-card-title
      >
      <v-card-actions class="justify-center">
        <v-icon class="admin-users-card-icon">mdi-message-reply-outline</v-icon>
        <span class="users-reply-count">{{ user.tweetCount }}</span>
        <v-icon class="admin-users-card-icon">mdi-heart-outline</v-icon>
        <span class="users-like-count">{{ user.likedCount }}</span>
      </v-card-actions>
      <v-card-actions class="justify-center">
        <span class="users-following-count">{{ user.followingCount }} 個</span>
        <span class="users-following-text">跟隨中</span>
        <span class="users-follower-count">{{ user.followerCount }} 位</span>
        <span class="users-follower-text">跟隨者</span>
      </v-card-actions>
    </v-container>
  </v-card>
</template>
<script>
export default {
  name: "AdminUserCard",
  props: {
    initialUser: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      user: this.initialUser,
      zIndex: 0,
    };
  },
};
</script>
<style lang="scss">
@import "../assets/scss/components/_AdminUsers";
</style>
