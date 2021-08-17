<template>
  <v-card elevation="0" tile class="profile-card">
    <v-img
      height="200px"
      :src="user.avatar"
      :alt="user.name"
      class="profile-cover-image"
    >
    </v-img>
    <v-avatar
      size="140"
      class="profile-avatar"
      :z-index="zIndex"
      absolute
      bottom
      fab
    >
      <img class="profile-avatar-image" :alt="user.name" :src="user.cover" />
    </v-avatar>
    <v-card-text class="profile-content">
      <v-card-actions>
        <v-row class="flex-row-reverse">
          <v-dialog
            v-if="currentUser.id === user.id"
            v-model="dialog"
            max-width="600px"
            max-hight="300px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                v-bind="attrs"
                v-on="on"
                color="primary"
                class="text-no-wrap rounded-pill px-4"
                >編輯個人資料</v-btn
              >
            </template>
            <!-- modal -->
            <UserProfileEditModal />
          </v-dialog>

          <v-btn
            elevation="0"
            color="primary"
            class="text-no-wrap rounded-pill px-4"
            >正在跟隨</v-btn
          >
          <v-btn outlined color="primary" class="text-no-wrap rounded-pill px-4"
            >跟隨</v-btn
          >
        </v-row>
      </v-card-actions>
      <v-list class="ml-1" align="start">
        <v-list-item-title class="profile-name">MasterCard</v-list-item-title>
        <v-list-item-subtitle class="tweets-account"
          >@MasterCard</v-list-item-subtitle
        >
      </v-list>
      <v-card-text class="profile-intro"
        >Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
        sint.Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
        sint.
      </v-card-text>
      <v-card-subtitle class="profile-followship"
        ><span class="profile-following-count">34 個</span
        ><span class="profile-following-text mr-1">跟隨中</span
        ><span class="profile-follower-count">59 位</span>
        <span class="profile-follower-text">跟隨者</span></v-card-subtitle
      >
    </v-card-text>
  </v-card>
</template>
<script>
import UserProfileEditModal from "./UserProfileEditModal.vue";
import { mapState } from "vuex";
export default {
  name: "UserProfileInfo",
  components: {
    UserProfileEditModal,
  },
  props: {
    initialUser: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    user: this.initialUser,
    zIndex: 0,
    dialog: false,
  }),

  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
};
</script>
<style lang="scss">
@import "./../assets/scss/components/_UserProfileInfo.scss";
</style>

