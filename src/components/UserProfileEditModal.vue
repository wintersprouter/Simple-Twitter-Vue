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
            :disabled="isProcessing"
          >
            {{ isProcessing ? "處理中..." : "儲存" }}
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
            name="cover"
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
              name="avatar"
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
          name="name"
          filled
          dense
          counter
          required
          :rules="[rules.required]"
          :value="user.name"
          maxlength="50"
        ></v-text-field>
        <v-textarea
          name="introduction"
          filled
          label="自我介紹"
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
import { Toast } from "./../utils/helpers";
import usersAPI from "./../apis/users";

export default {
  name: "UserProfileEditModal",
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
      isProcessing: false,
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
      console.log("e.targetcover", e.target);
      console.log("cover.this.files", this.files);
      if (this.files !== null) {
        const CoverimageURL = window.URL.createObjectURL(this.files);
        console.log(" CoverimageUR", CoverimageURL);
        this.user.cover = CoverimageURL;
      } else {
        Toast.fire({
          icon: "error",
          title: "無法上傳使用者封面，請稍後再試",
        });
      }
    },
    handleAvatarChange(e) {
      console.log("e.targetAvatar", e.target);
      console.log("avatar.this.files", this.files);
      if (this.files !== null) {
        const avatarimageURL = window.URL.createObjectURL(this.files);
        console.log(" avatarimageUR", avatarimageURL);
        this.user.avatar = avatarimageURL;
      } else {
        Toast.fire({
          icon: "error",
          title: "無法上傳使用者頭像，請稍後再試",
        });
      }
    },
    async handleSubmit(e) {
      try {
        if (!this.user.name) {
          Toast.fire({
            icon: "warning",
            title: "請填寫使用者名稱",
          });
          return;
        }
        const form = e.target;
        console.log(form);
        const formData = new FormData(form);
        console.log(formData);
        console.log("userId", this.user.id);
        const { data } = await usersAPI.users.updateProfile({
          userId: this.user.id,
          formData,
        });
        console.log("data", data);

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        Toast.fire({ icon: "success", title: "成功更新使用者資料" });
        this.dialog = false;
        // this.$emit("after-submit", formData);
      } catch (error) {
        this.isProcessing = false;
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法更新使用者資料，請稍後再試",
        });
      }
    },
  },
};
</script>
<style lang="scss">
@import "../assets/scss/components/_UserProfileInfo.scss";
@import "../assets/scss/components/_UserProfileEditModal.scss";
</style>
