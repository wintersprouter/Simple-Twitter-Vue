<template>
  <v-card elevation="0" tile class="reply-list">
    <v-card elevation="0" class="reply-card">
      <v-card-text class="ml-1">
        <v-row>
          <router-link :to="`/users/${reply.UserId}`" class="links">
            <v-avatar size="50" class="tweet-card-avatar mb-2">
              <img :src="reply.avatar" :alt="reply.name" class="image" />
            </v-avatar>
          </router-link>
          <v-list class="pt-1 ml-1">
            <v-list-item-title class="ml-1">
              <span class="tweets-name">{{ reply.name }}</span>
              <span class="ml-1 tweets-account"
                >@{{ reply.commentAccount }}</span
              >
              <span class="ml-1 tweets-account"
                >· {{ reply.createdAt | fromNow }}</span
              >
            </v-list-item-title>
            <v-list-item-subtitle class="ml-1">
              <span class="tweets-account">回覆</span>
              <span class="reply-target ml-1"
                >@{{ reply.tweetAuthorAccount }}</span
              >
            </v-list-item-subtitle>
            <v-list-item-content class="reply-content ml-1">{{
              reply.comment
            }}</v-list-item-content>
          </v-list>
        </v-row>
      </v-card-text>
    </v-card>
    <v-divider></v-divider>
  </v-card>
</template>

<script>
import { fromNowFilter } from "./../utils/mixins";
export default {
  name: "Replies",
  props: {
    initReply: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      Reply: this.initReply,
    };
  },
  mixins: [fromNowFilter],
  watch: {
    initReplies(newValue) {
      this.replies = [...newValue];
    },
  },
};
</script>
<style lang="scss">
@import "../assets/scss/components/_Replies.scss";
</style>
