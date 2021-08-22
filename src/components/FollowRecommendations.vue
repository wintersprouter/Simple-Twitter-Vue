<template>
  <v-card elevation="0" max-width="350" class="recommend-list">
    <v-card class="secondary rounded-t-xl" outlined>
      <v-card-title class="text-left recommend-list-top-title"
        >跟隨誰</v-card-title
      >
    </v-card>
    <v-card
      v-for="user in users.slice(0, 6)"
      :key="user.id"
      class="secondary"
      max-width="350"
      outlined
    >
      <v-divider></v-divider>
      <v-row align="center" justify="space-around">
        <v-list-item two-line class="ma-2" width="100%">
          <router-link :to="`/users/${user.id}`" class="links">
            <v-list-item-avatar class="user-info-avatar" color="gary" size="50">
              <img :src="user.avatar" :alt="user.name" class="image" />
            </v-list-item-avatar>
          </router-link>
          <v-list-item-content class="user-info-text">
            <v-list-item-title class="user-info-text-name">{{
              user.name
            }}</v-list-item-title>
            <v-list-item-subtitle class="user-info-text-account"
              >@{{ user.account }}</v-list-item-subtitle
            >
          </v-list-item-content>
          <v-card-actions class="followship-button">
            <v-btn
              v-if="user.isFollowed && currentUser.id !== user.id"
              @click.stop.prevent="unfollow(user.id)"
              color="primary"
              elevation="0"
              dark
              rounded
              class="px-4"
              :disabled="isProcessing"
            >
              正在跟隨
            </v-btn>
            <v-btn
              v-if="!user.isFollowed && currentUser.id !== user.id"
              @click.stop.prevent="follow(user.id)"
              rounded
              outlined
              color="primary"
              class="px-4"
              dark
              :disabled="isProcessing"
            >
              跟隨</v-btn
            >
          </v-card-actions>
        </v-list-item>
      </v-row>
    </v-card>
    <v-expand-transition>
      <v-card elevation="0" max-width="350">
        <v-card
          v-if="show && users.length <= 4"
          class="secondary"
          max-width="350"
          outlined
        >
          <v-divider></v-divider>
          <v-card-text>目前沒有更多使用者</v-card-text>
        </v-card>
        <v-card
          v-show="show"
          class="secondary"
          max-width="350"
          outlined
          v-for="user in users.slice(6, users.length)"
          :key="user.id"
        >
          <v-divider></v-divider>
          <v-row align="center" justify="space-around">
            <v-list-item two-line class="ma-2" width="100%">
              <router-link :to="`/users/${user.id}`" class="links">
                <v-list-item-avatar
                  class="user-info-avatar"
                  color="gary"
                  size="50"
                >
                  <img :src="user.avatar" :alt="user.name" class="image" />
                </v-list-item-avatar>
              </router-link>
              <v-list-item-content class="user-info-text">
                <v-list-item-title class="user-info-text-name">{{
                  user.name
                }}</v-list-item-title>
                <v-list-item-subtitle class="user-info-text-account"
                  >@{{ user.account }}</v-list-item-subtitle
                >
              </v-list-item-content>
              <v-card-actions class="followship-button">
                <v-btn
                  v-if="user.isFollowed && currentUser.id !== user.id"
                  @click.stop.prevent="unfollow(user.id)"
                  color="primary"
                  elevation="0"
                  dark
                  rounded
                  class="px-4"
                  :disabled="isProcessing"
                >
                  正在跟隨
                </v-btn>
                <v-btn
                  v-if="!user.isFollowed && currentUser.id !== user.id"
                  @click.stop.prevent="follow(user.id)"
                  rounded
                  outlined
                  color="primary"
                  class="px-4"
                  dark
                  :disabled="isProcessing"
                >
                  跟隨</v-btn
                >
              </v-card-actions>
            </v-list-item>
          </v-row>
        </v-card>
      </v-card>
    </v-expand-transition>
    <v-card class="text-left secondary rounded-b-xl" outlined>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn id="recommend-list-bottom-title" text @click="show = !show">
          {{ show ? "顯示更少" : "顯示更多 " }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import followshipsAPI from "./../apis/followships";
import { Toast } from "./../utils/helpers";

export default {
  name: "FollowRecommendations",
  props: {
    initialTopUsers: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      users: this.initialTopUsers,
      isProcessing: false,
      show: false,
    };
  },
  methods: {
    async follow(followingId) {
      try {
        this.isProcessing = true;
        const { data } = await followshipsAPI.follow({ followingId });

        console.log("data", data);

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        Toast.fire({
          icon: "success",
          title: `${data.message}`,
        });

        this.users = this.users.map((user) => {
          if (user.id !== followingId) {
            return user;
          } else {
            return {
              ...user,
              followerCount: user.followerCount + 1,
              isFollowed: true,
            };
          }
        });
        this.isProcessing = false;
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
        this.users = this.users.map((user) => {
          if (user.id !== followingId) {
            return user;
          } else {
            return {
              ...user,
              followerCount: user.followerCount - 1,
              isFollowed: false,
            };
          }
        });
        Toast.fire({ icon: "success", title: `${data.message}` });
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({ icon: "error", title: "無法移除追蹤，請稍後再試" });
      }
    },
  },
  watch: {
    initialTopUsers(newValue) {
      this.users = [...newValue];
    },
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
};
</script>
<style lang="scss">
@import "./../assets/scss/components/_FollowRecommendations.scss";
</style>

