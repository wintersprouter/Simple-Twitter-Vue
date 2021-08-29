<template>
  <v-card elevation="0" style="border-radius: 14px" class="profile-card">
    <v-form @submit.stop.prevent="handleSubmit">
      <v-card-actions>
        <v-btn color="primary" icon @click.stop.prevent="handleClick"
          ><span>&#10005;</span>
        </v-btn>
        <v-row class="justify-space-between px-2 mx-0 mt-0" hight="50px">
          <p class="tweet-count mt-1 ml-3">編輯個人資料</p>
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
        <v-img height="200px" :src="cover" :alt="name" />
        <v-btn class="button-cover ma-2" plain fab>
          <v-file-input
            hide-input
            name="cover"
            accept="image/png, image/jpeg, image/jpg"
            prepend-icon="mdi-camera"
            truncate-length="20"
            label="Cover"
            class="input-cover"
            v-model="newCover"
            @change="handleCoverChange"
          ></v-file-input>
        </v-btn>

        <v-avatar size="140" class="profile-avatar" fab>
          <v-img :src="avatar" :alt="name" />

          <v-btn class="button-avatar ma-2" plain fab>
            <v-file-input
              class="input-avatar"
              name="avatar"
              hide-input
              accept="image/png, image/jpeg, image/jpg"
              prepend-icon="mdi-camera"
              truncate-length="20"
              label="Avatar"
              v-model="newAvatar"
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
          v-model.trim="name"
          maxlength="50"
        ></v-text-field>
        <v-textarea
          name="introduction"
          filled
          label="自我介紹"
          auto-grow
          v-model.trim="introduction"
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
import { mapState } from "vuex";

export default {
  name: "UserProfileEditModal",
  inject: ["reload"],
  data() {
    return {
      id: 0,
      name: "",
      introduction: null,
      avatar: "",
      cover: "",
      newAvatar: "",
      newCover: "",
      rules: {
        required: (value) => !!value || "Required.",
      },
      dialog: true,
      files: [],
      isProcessing: false,
    };
  },
  async created() {
    try {
      this.$store.dispatch("fetchCurrentUser");
      const { id, avatar, cover, name, introduction } = this.currentUser;
      this.id = id;
      this.avatar = avatar;
      this.cover = cover;
      this.name = name;
      this.introduction = introduction;
    } catch (error) {
      console.log("error", error);
    }
  },
  methods: {
    handleCoverChange() {
      if (this.newCover !== null) {
        const coverImageURL = window.URL.createObjectURL(this.newCover);
        this.cover = coverImageURL;
      } else {
        this.cover = this.currentUser.cover;
      }
    },
    handleAvatarChange() {
      if (this.newAvatar !== null) {
        const avatarimageURL = window.URL.createObjectURL(this.newAvatar);
        this.avatar = avatarimageURL;
      } else {
        this.avatar = this.currentUser.avatar;
      }
    },
    async handleSubmit() {
      try {
        if (!this.name.trim().length) {
          Toast.fire({
            icon: "warning",
            title: "請填寫使用者名稱",
          });
          return;
        }
        this.isProcessing = true;

        let formData = new FormData();
        formData.append("name", this.name);
        if (this.introduction !== null) {
          formData.append("introduction", this.introduction);
        }

        if (this.newCover !== null) {
          formData.append("cover", this.newCover);
        }
        if (this.newAvatar !== null) {
          formData.append("avatar", this.newAvatar);
        }
        const { data } = await usersAPI.users.updateProfile({
          userId: this.id,
          formData,
        });

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        Toast.fire({ icon: "success", title: "成功更新使用者資料" });
        this.reload();
        this.$emit("after-click-close");
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法更新使用者資料，請稍後再試",
        });
      }
    },
    handleClick() {
      this.avatar = this.currentUser.avatar;
      this.cover = this.currentUser.cover;
      this.name = this.currentUser.name;
      this.introduction = this.currentUser.introduction;
      this.$emit("after-click-close");
    },
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.currentUser,
    }),
  },
};
</script>
<style lang="scss" scoped>
.profile-card {
  position: relative;
  margin: 0 auto;
  .edit-images {
    padding: 0 0 8px 0;
    position: relative;
    .profile-cover-image {
      position: relative;
      opacity: 75%;
      z-index: 1;
    }
    .button-cover {
      position: absolute;
      right: calc(50% - 50px);
      top: calc(50% - 35px);
      z-index: 2;
      .input-cover {
        margin: 0;
        padding: 0;
      }
    }

    .profile-avatar {
      position: absolute;
      // right: calc(50% - 50px);
      left: 20px;
      top: 130px;
      .profile-avatar-image {
        opacity: 85%;
        z-index: 2;
      }
      .button-avatar {
        position: absolute;
        right: calc(50% - 50px);
        bottom: calc(50% - 35px);
        z-index: 3;
        .input-avatar {
          margin: 0;
          padding: 0;
        }
      }
    }
  }
}
</style>
