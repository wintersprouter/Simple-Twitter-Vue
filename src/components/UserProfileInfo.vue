<template>
  <v-card elevation="0" tile class="profile-card">
    <v-img height="200px" :src="user.cover" :alt="user.name" class="image">
    </v-img>
    <v-avatar
      size="140"
      class="profile-avatar"
      :z-index="zIndex"
      absolute
      bottom
      fab
    >
      <img class="image" :alt="user.name" :src="user.avatar" />
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
      <v-list class="ml-1" align="start">
        <v-list-item-title class="profile-name">{{
          user.name
        }}</v-list-item-title>
        <v-list-item-subtitle class="tweets-account"
          >@{{ user.account }}</v-list-item-subtitle
        >
      </v-list>
      <v-card-text class="profile-intro">{{ user.introduction }} </v-card-text>
      <v-card-subtitle class="profile-followship">
        <router-link :to="`/users/${user.id}/followship`" class="links">
          <span class="profile-following-count"
            >{{ initialUser.followingCount }} 個</span
          ><span class="profile-following-text mr-1">跟隨中</span>
        </router-link>
        <router-link
          :to="`/users/${user.id}/followship/follower`"
          class="links"
        >
          <span class="profile-follower-count"
            >{{ user.followerCount }} 位</span
          >
          <span class="profile-follower-text">跟隨者</span>
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
