<template>
  <v-col class="col-lg-3 col-md-4 col-sm-6 col-xs-8">
    <v-card color="#F6F7F8" class="admin-users-card ma-2 align-self-stretch;">
      <v-img height="140px" :src="user.cover" :alt="user.name"> </v-img>
      <v-avatar
        size="100"
        class="profile-avatar"
        :z-index="zIndex"
        absolute
        fab
      >
        <img class="profile-avatar-image" :alt="user.name" :src="user.avatar" />
      </v-avatar>
      <v-container>
        <div class="admin-user-name mt-5 mx-0 pt-1 text-center">
          {{ user.name }}
        </div>
        <p class="admin-user-account text-center">@{{ user.account }}</p>
        <v-card-actions class="justify-center py-0">
          <v-icon class="admin-user-icon">mdi-message-reply-outline</v-icon>
          <span class="admin-user-icon-count mr-2">{{ user.tweetCount }}</span>
          <v-icon class="admin-users-card-icon">mdi-heart-outline</v-icon>
          <span class="admin-user-icon-count">{{ user.likedCount }}</span>
        </v-card-actions>
        <v-card-actions class="justify-center">
          <span class="admin-user-follow-count"
            >{{ user.followingCount }} 個</span
          >
          <span class="admin-user-follow-text mr-1">跟隨中</span>
          <span class="admin-user-follow-count"
            >{{ user.followerCount }} 位</span
          >
          <span class="admin-user-follow-text">跟隨者</span>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-col>
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
<style lang="scss" scoped>
.admin-users-card {
  max-width: 245px;
  height: 314px;
  border-radius: 10px;
  margin: 0 auto;
  .profile-avatar {
    position: absolute;
    border: 4px solid #ffffff;
    box-sizing: border-box;
    right: calc(50% - 50px);
    top: 68px;
  }
}
</style>
