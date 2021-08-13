<template>
  <v-card elevation="0" tile class="profile-card">
    <v-img
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg"
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
      <img
        class="profile-avatar-image"
        alt="user"
        src="https://s3-alpha-sig.figma.com/img/7075/8e0a/7c0f47389595381eca543235de212578?Expires=1629676800&Signature=Gl7kltNyWTw0~J6NS5uuY7h8xlKMYqLdS8uw-bwTJq-nlegZL15vZu9dzHtE3d5-O0iks8cb6liwxfA-2Y-Iwduraa4IbCG10zS-hJNVXYzof9I4R3xUtUJ6WMVfeOx6sRko9yyaCHy51WftLXBil7bjiH6UIJFcDH~fW6aIV0jGzYRjTfVioIy7y9nyBBqKoGFAPKaRBsqC6Yb-9lMo5RQki4AA7PsydN-rHQ5Q4bAqI1w-2fzgkZwNMoCmMBXLQbWaDA3EUNYHCmlg1yLWN5Y7-qw4JUu06nIMsV~aDIxcDrY2x9s3jjfwHDD0B4LvRzwACX4EjW28XMAiZj2o9w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
      />
    </v-avatar>
    <v-card-text class="profile-content">
      <v-card-actions>
        <v-row class="flex-row-reverse">
          <v-dialog v-model="dialog" max-width="600px" max-hight="300px">
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
export default {
  name: "UserProfileInfo",
  components: {
    UserProfileEditModal,
  },
  data: () => ({
    zIndex: 0,
    dialog: false,
  }),
};
</script>
<style lang="scss">
@import "./../assets/scss/components/_UserProfileInfo.scss";
</style>

