<template>
  <v-card elevation="0" tile class="reply-list">
    <v-card
      tile
      v-for="reply in replies"
      :key="reply.id"
      elevation="0"
      class="reply-card"
    >
      <v-container class="d-flex justify-space-between align-start">
        <router-link :to="`/users/${reply.UserId}`">
          <v-avatar size="50" class="tweet-card-avatar mb-2">
            <img :src="reply.avatar" :alt="reply.name" />
          </v-avatar>
        </router-link>
        <v-list class="mt-0 ml-2 pt-0">
          <v-list-item-title class="ml-2">
            <span class="tweets-user-name">{{ reply.name }}</span>
            <span class="ml-2 tweets-user-account"
              >@{{ reply.commentAccount }}</span
            >
            <span class="ml-2 tweets-user-account"
              >· {{ reply.createdAt | fromNow }}</span
            >
          </v-list-item-title>
          <v-list-item-subtitle class="ml-2">
            <span class="tweets-user-account">回覆</span>
            <span class="reply-target ml-2"
              >@{{ reply.tweetAuthorAccount }}</span
            >
          </v-list-item-subtitle>
          <v-list-item-content class="reply-description ml-2"
            ><p class="reply-description">
              {{ reply.comment }}
            </p></v-list-item-content
          >
        </v-list>
      </v-container>
    </v-card>
  </v-card>
</template>

<script>
import { fromNowFilter } from "./../utils/mixins";
export default {
  name: "Replies",
  props: {
    initReplies: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      replies: this.initReplies,
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
<style lang="scss" scoped>
.reply-list {
  width: 100%;
  padding: 0;
  margin: 0;
  .reply-card {
    width: 100%;
    padding: 10px 15px 0px 15px;
    margin: 0 auto;
    border-bottom: 1px solid #e5e5e5;
  }
}
</style>
