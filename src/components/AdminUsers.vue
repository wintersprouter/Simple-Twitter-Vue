<template>
  <v-card class="admin-users-card">
    <v-img
      height="140px"
      src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg"
    >
    </v-img>
    <v-avatar size="100" class="profile-avatar" :z-index="zIndex" absolute fab>
      <img
        class="profile-avatar-image"
        alt="user"
        src="https://s3-alpha-sig.figma.com/img/7075/8e0a/7c0f47389595381eca543235de212578?Expires=1629676800&Signature=Gl7kltNyWTw0~J6NS5uuY7h8xlKMYqLdS8uw-bwTJq-nlegZL15vZu9dzHtE3d5-O0iks8cb6liwxfA-2Y-Iwduraa4IbCG10zS-hJNVXYzof9I4R3xUtUJ6WMVfeOx6sRko9yyaCHy51WftLXBil7bjiH6UIJFcDH~fW6aIV0jGzYRjTfVioIy7y9nyBBqKoGFAPKaRBsqC6Yb-9lMo5RQki4AA7PsydN-rHQ5Q4bAqI1w-2fzgkZwNMoCmMBXLQbWaDA3EUNYHCmlg1yLWN5Y7-qw4JUu06nIMsV~aDIxcDrY2x9s3jjfwHDD0B4LvRzwACX4EjW28XMAiZj2o9w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
      />
    </v-avatar>
    <v-container class="flex-column justify-center">
      <v-card-title class="justify-center pb-0">John Doe</v-card-title>
      <v-card-title class="justify-center py-0">@lesAlex</v-card-title>
      <v-card-actions class="justify-center">
        <v-icon>mdi-message-reply-outline</v-icon>
        <span>545</span>
        <v-icon>mdi-heart-outline</v-icon>
        <span>545</span>
      </v-card-actions>
      <v-card-actions class="justify-center">
        <span>545個</span>
        <span>跟隨中</span>
        <span>55位</span>
        <span>跟隨者</span>
      </v-card-actions>
    </v-container>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    zIndex: 0,
  }),
};
</script>
<style lang="scss">
@import "../assets/scss/components/_AdminUsers";
</style>
