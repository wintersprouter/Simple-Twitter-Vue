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
        :src="user.cover"
        :alt="user.name"
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
          :src="user.avatar"
          :alt="user.avatar"
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
        :value="user.name"
        maxlength="50"
      ></v-text-field>
      <v-textarea
        filled
        label="自我介紹"
        autofocus
        auto-grow
        :value="user.introduction"
        counter
        maxlength="160"
      ></v-textarea>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      user: this.initUser,
      rules: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!",
      ],
      dialog: true,
    };
  },
  props: {
    initUser: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="scss">
@import "../assets/scss/components/_UserProfileInfo.scss";
</style>
<style lang="scss" scoped>
@import "../assets/scss/components/_UserProfileEditModal.scss";
</style>
