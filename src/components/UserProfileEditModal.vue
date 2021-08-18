<template>
  <v-card elevation="0" style="border-radius: 14px" class="profile-card">
    <v-form @submit.stop.prevent="handleSubmit">
      <v-card-actions>
        <v-btn color="primary" text @click="dialog = false"
          ><span>&#10005;</span>
        </v-btn>
        <v-row class="justify-space-between px-2 mx-0 mt-0" hight="50px">
          <p class="profile-card-title mt-1 ml-3">編輯個人資料</p>
          <v-btn
            class="ml-2 mr-1"
            color="primary"
            rounded
            elevation="0"
            type="sumbit"
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
            :rules="[rules.coverSize]"
            accept="image/png, image/jpeg, image/jpg"
            prepend-icon="mdi-camera"
            truncate-length="20"
            label="Cover"
            class="input-cover"
            v-model="files"
            @change="handleCoverChange"
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
              :rules="[rules.avatarSize]"
              accept="image/png, image/jpeg, image/jpg"
              prepend-icon="mdi-camera"
              truncate-length="20"
              label="Avatar"
              v-model="files"
              @change="handleAvatarChange"
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
          :rules="[rules.required]"
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
    </v-form>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      user: this.initUser,

      rules: {
        required: (value) => !!value || "Required.",
        avatarSize: (value) =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!",
        coverSize: (value) =>
          !value ||
          value.size < 2000000 ||
          "Cover size should be less than 2 MB!",
      },
      dialog: true,
      files: [],
    };
  },
  props: {
    initUser: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleCoverChange(e) {
      console.log("e.target", e.target);
      console.log("coverthis.files", this.files);
      if (this.files !== null) {
        const CoverimageURL = window.URL.createObjectURL(this.files);
        console.log(" CoverimageUR", CoverimageURL);
        this.user.cover = CoverimageURL;
      }
    },
    handleAvatarChange(e) {
      console.log("e.targetAvatar", e.target);
      console.log("Avatarthis.files", this.files);
      if (this.files !== null) {
        const avatarimageURL = window.URL.createObjectURL(this.files);
        console.log(" avatarimageUR", avatarimageURL);
        this.user.avatar = avatarimageURL;
      }
    },
  },
};
</script>
<style lang="scss">
@import "../assets/scss/components/_UserProfileInfo.scss";
@import "../assets/scss/components/_UserProfileEditModal.scss";
</style>
