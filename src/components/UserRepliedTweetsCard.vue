<template>
  <v-card elevation="0" relative>
    <v-list class="p-0">
      <v-container class="profile-reply-card">
        <router-link :to="`/users/${tweet.replyUserId}`" class="links">
          <v-avatar size="50" class="pt-0">
            <img :src="tweet.replyAvatar" :alt="tweet.replyName" />
          </v-avatar>
        </router-link>

        <v-card-text class="py-0">
          <v-list-item-title>
            <span class="mr-2 tweets-name">{{ tweet.replyName }}</span>
            <span class="tweets-account">@{{ tweet.replyAccount }}</span>
            <span class="tweets-account"> · </span>
            <span class="tweets-account">{{
              tweet.replyCreatedAt | fromNow
            }}</span>
          </v-list-item-title>
          <v-list-item-subtitle>
            <span class="tweet-reply-title mr-1">回覆給</span>
            <span class="tweet-reply-target"
              >@{{ tweet.tweetAuthorAccount }}</span
            ></v-list-item-subtitle
          >
          <v-list-item-content class="pt-2 pb-2 tweets-content">
            {{ tweet.replyComment }}
          </v-list-item-content>
        </v-card-text>
      </v-container>
      <v-container class="profile-reply-card">
        <router-link :to="`/users/${tweet.tweetAuthorId}`" class="links">
          <v-avatar size="50" class="tweet-card-avatar">
            <img :src="tweet.tweetAuthorAvatar" :alt="tweet.tweetAuthorName" />
          </v-avatar>
        </router-link>
        <router-link :to="`/tweets/${tweet.tweetId}`" class="links">
          <v-card-text class="py-0">
            <v-list-item-title>
              <span class="mr-2 tweets-name">{{ tweet.tweetAuthorName }}</span>
              <span class="tweets-account"
                >@{{ tweet.tweetAuthorAccount }}</span
              >
              <span class="tweets-account"> · </span>
              <span class="tweets-account">{{
                tweet.tweetCreatedAt | fromNow
              }}</span>
            </v-list-item-title>
            <v-list-item-content class="pt-2 pb-2 tweets-content">
              {{ tweet.tweetDescription }}
            </v-list-item-content>
          </v-card-text>
        </router-link>
      </v-container>
    </v-list>
    <v-divider></v-divider>
  </v-card>
</template>
<script>
import { fromNowFilter } from "../utils/mixins";
export default {
  name: "UserRepiedweets",
  props: {
    initialTweet: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tweet: this.initialTweet,
    };
  },
  mixins: [fromNowFilter],
};
</script>
<style lang="scss">
@import "../assets/scss/components/_UserRepliedTweets.scss";
// @import "../assets/scss/components/_UserRepliedTweetsCard";
</style>
