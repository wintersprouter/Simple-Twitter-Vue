<template>
  <v-card elevation="0" tile class="profile-card">
    <v-img height="200px" :src="user.cover" :alt="user.name" />
    <v-avatar
      size="140"
      class="profile-avatar"
      :z-index="zIndex"
      absolute
      bottom
      fab
    >
      <v-img :alt="user.name" :src="user.avatar" />
    </v-avatar>
    <v-card-text class="profile-content">
      <v-card-actions>
        <v-row class="flex-row-reverse">
          <v-dialog
            v-if="this.currentUser.id === user.id"
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
            <UserProfileEditModal @after-click-close="afterClickClose" />
          </v-dialog>

          <v-btn
            v-if="user.isFollowed && currentUser.id !== user.id"
            @click.stop.prevent="unfollow(user.id)"
            elevation="0"
            color="primary"
            class="text-no-wrap rounded-pill px-4"
            :disabled="isProcessing"
            >正在跟隨</v-btn
          >
          <v-btn
            v-if="!user.isFollowed && currentUser.id !== user.id"
            @click.stop.prevent="follow(user.id)"
            outlined
            color="primary"
            class="text-no-wrap rounded-pill px-4"
            :disabled="isProcessing"
            >跟隨</v-btn
          >
        </v-row>
      </v-card-actions>
      <v-list class="ml-4 mt-0 pt-0" align="start">
        <v-list-item-title class="profile-user-name" style="font-size: 19px">{{
          user.name
        }}</v-list-item-title>
        <v-list-item-subtitle class="tweets-user-account"
          >@{{ user.account }}</v-list-item-subtitle
        >
      </v-list>
      <v-card-text class="profile-intro pt-0"
        >{{ user.introduction }}
      </v-card-text>
      <v-card-subtitle class="profile-followship py-0">
        <router-link :to="`/users/${user.id}/followship`" class="links">
          <span class="profile-count ml-3"
            >{{ initialUser.followingCount }} 個</span
          ><span class="profile-text mr-1">跟隨中</span>
        </router-link>
        <router-link
          :to="`/users/${user.id}/followship/follower`"
          class="links"
        >
          <span class="profile-count ml-4">{{ user.followerCount }} 位</span>
          <span class="profile-text">跟隨者</span>
        </router-link></v-card-subtitle
      >
    </v-card-text>
  </v-card>
</template>
<script>
import UserProfileEditModal from "./UserProfileEditModal.vue";
import { mapState } from "vuex";
import followshipsAPI from "./../apis/followships";
import { Toast } from "./../utils/helpers";

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
  data() {
    return {
      user: this.initialUser,
      zIndex: 0,
      dialog: false,
      isProcessing: false,
    };
  },
  watch: {
    initialUser(newValue) {
      this.user = newValue;
    },
  },
  methods: {
    async follow(followingId) {
      try {
        this.isProcessing = true;
        const { data } = await followshipsAPI.follow({ followingId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        Toast.fire({
          icon: "success",
          title: `${data.message}`,
        });

        this.user.followerCount += 1;
        this.user.isFollowed = true;
        this.isProcessing = false;
        this.$emit("after-build-followship");
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法加入追蹤，請稍後再試",
        });
      }
    },
    async unfollow(followingId) {
      try {
        this.isProcessing = true;
        const { data } = await followshipsAPI.unfollow({ followingId });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.user.followerCount -= 1;
        this.user.isFollowed = false;
        this.isProcessing = false;
        Toast.fire({ icon: "success", title: `${data.message}` });
        this.isProcessing = false;

        this.$emit("after-build-followship");
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({ icon: "error", title: "無法移除追蹤，請稍後再試" });
      }
    },
    afterClickClose() {
      this.dialog = false;
    },
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
};
</script>
<style lang="scss" scoped>
.profile-card {
  position: relative;
  margin: 0;
  .profile-avatar {
    position: absolute;
    border: 4px solid #ffffff;
    box-sizing: border-box;
    top: 129px;
    left: 15px;
  }
  .profile-followship {
    padding: 1rem 0.2rem;
  }
}
</style>
