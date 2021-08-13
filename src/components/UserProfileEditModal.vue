<template>
  <v-card elevation="0" style="border-radius: 14px" class="profile-card">
    <v-card-actions>
      <v-btn color="primary" text @click="dialog = false"
        ><span>&#10005;</span>
      </v-btn>
      <v-row class="justify-space-between">
        <p class="profile-card-title mt-4 ml-3">編輯個人資料</p>
        <v-btn
          class="mt-2 mr-1"
          color="primary"
          rounded
          elevation="0"
          @click="dialog = false"
        >
          回覆
        </v-btn>
      </v-row>
    </v-card-actions>
    <v-divider></v-divider>
    <v-card-actions class="edit-images">
      <v-img
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg"
        class="profile-cover-image"
      />
      <v-btn class="button-cover ma-2" plain fab>
        <v-file-input
          hide-input
          :rules="rules"
          accept="image/png, image/jpeg, image/jpg"
          prepend-icon="mdi-camera"
          truncate-length="20"
          label="Cover"
          class="input-cover"
        ></v-file-input>
      </v-btn>

      <v-avatar size="140" class="profile-avatar" fab>
        <v-img
          class="profile-avatar-image"
          alt="user"
          src="https://s3-alpha-sig.figma.com/img/7075/8e0a/7c0f47389595381eca543235de212578?Expires=1629676800&Signature=Gl7kltNyWTw0~J6NS5uuY7h8xlKMYqLdS8uw-bwTJq-nlegZL15vZu9dzHtE3d5-O0iks8cb6liwxfA-2Y-Iwduraa4IbCG10zS-hJNVXYzof9I4R3xUtUJ6WMVfeOx6sRko9yyaCHy51WftLXBil7bjiH6UIJFcDH~fW6aIV0jGzYRjTfVioIy7y9nyBBqKoGFAPKaRBsqC6Yb-9lMo5RQki4AA7PsydN-rHQ5Q4bAqI1w-2fzgkZwNMoCmMBXLQbWaDA3EUNYHCmlg1yLWN5Y7-qw4JUu06nIMsV~aDIxcDrY2x9s3jjfwHDD0B4LvRzwACX4EjW28XMAiZj2o9w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
        />

        <v-btn class="button-avatar ma-2" plain fab>
          <v-file-input
            class="input-avatar"
            hide-input
            :rules="rules"
            accept="image/png, image/jpeg, image/jpg"
            prepend-icon="mdi-camera"
            truncate-length="20"
            label="Avatar"
          ></v-file-input>
        </v-btn>
      </v-avatar>
    </v-card-actions>

    <v-card-text class="profile-content mt-15">
      <v-text-field
        label="名稱"
        filled
        dense
        counter
        required
        value=""
        maxlength="50"
      ></v-text-field>
      <v-textarea
        filled
        label="自我介紹"
        autofocus
        auto-grow
        value=""
        counter
        maxlength="160"
      ></v-textarea>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    rules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        "Avatar size should be less than 2 MB!",
    ],
  }),
};
</script>
<style lang="scss">
@import "../assets/scss/components/_UserProfileInfo.scss";
</style>
<style lang="scss" scoped>
@import "../assets/scss/components/_UserProfileEditModal.scss";
</style>
