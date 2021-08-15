<template>
  <v-card elevation="0" style="border-radius: 14px">
    <v-card-actions>
      <v-btn color="primary" text @click="dialog = false"
        ><span>&#10005;</span>
      </v-btn>
    </v-card-actions>
    <v-divider></v-divider>

    <v-card-actions>
      <v-container class="d-flex justify-space-between modal-top">
        <v-avatar size="50" class="tweet-card-avatar">
          <img :src="initTweet.avatar" :alt="initTweet.name" />
        </v-avatar>
        <v-divider vertical inset class="my-1" id="connect-line"></v-divider>

        <v-card-text class="py-0">
          <v-list-item-title>
            <span class="mr-2 tweets-name">{{ initTweet.name }}</span>
            <span class="tweets-account">@{{ initTweet.account }}</span>
            <span class="tweets-account"> · </span>
            <span class="tweets-account">
              {{ initTweet.createdAt | fromNow }}</span
            >
          </v-list-item-title>
          <v-list-item-content class="pt-2 pb-2">
            {{ initTweet.description }}
          </v-list-item-content>
          <v-list-item-subtitle>
            <span class="tweet-reply-title mr-1">回覆給</span>
            <span class="tweet-reply-target"
              >@{{ initTweet.account }}</span
            ></v-list-item-subtitle
          >
        </v-card-text>
      </v-container>
    </v-card-actions>

    <v-card-actions>
      <v-container class="d-flex justify-space-between">
        <v-avatar size="50" class="mr-5">
          <img :src="currentUser.avatar" :alt="currentUser.name" />
        </v-avatar>
        <v-textarea
          :rules="rules"
          :value="value"
          counter
          maxlength="50"
          auto-grow
          row-height="15"
          placeholder="推你的回覆"
          autofocus
        ></v-textarea>
      </v-container>
    </v-card-actions>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" rounded elevation="0" @click="dialog = false" mb-5>
        回覆
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { fromNowFilter } from "./../utils/mixins";
import { mapState } from "vuex";
export default {
  data: () => {
    return {
      dialog: false,
      tweet: this.initTweet,
    };
  },
  props: {
    initTweet: {
      type: Object,
      required: true,
    },
  },
  mixins: [fromNowFilter],
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
};
</script>
<style lang="scss">
@import "../assets/scss/components/_ReplyTweetModal.scss";
</style>
