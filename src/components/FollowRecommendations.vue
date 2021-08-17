<template>
  <v-card elevation="0" max-width="350" class="recommend-list">
    <v-card class="secondary rounded-t-xl" outlined>
      <v-card-title class="text-left recommend-list-top-title"
        >跟隨誰</v-card-title
      >
    </v-card>
    <v-card
      v-for="user in users"
      :key="user.id"
      class="secondary"
      max-width="350"
      outlined
    >
      <v-divider></v-divider>
      <v-row align="center" justify="space-around">
        <v-list-item two-line class="ma-2" width="100%">
          <v-list-item-avatar
            class="user-info-avatar"
            color="warning lighten-2"
            size="50"
          >
            <img :src="user.avatar" :alt="user.name" />
          </v-list-item-avatar>
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
              v-if="currentUser.isFollowed && currentUser.id !== user.id"
              color="primary"
              elevation="0"
              dark
              class="px-4"
            >
              正在跟隨
            </v-btn>
            <v-btn
              v-if="!currentUser.isFollowed && currentUser.id !== user.id"
              rounded
              outlined
              color="primary"
              class="px-4"
              dark
            >
              跟隨</v-btn
            >
          </v-card-actions>
        </v-list-item>
      </v-row>
    </v-card>

    <v-card class="text-left secondary rounded-b-xl" outlined>
      <v-divider></v-divider>
      <v-card-text id="recommend-list-bottom-title">顯示更多</v-card-text>
    </v-card>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

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
    };
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

