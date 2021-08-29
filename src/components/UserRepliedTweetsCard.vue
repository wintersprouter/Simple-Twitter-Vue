<template>
  <v-card elevation="0" relative max-width="600px" tile class="mt-0">
    <v-list class="p-0 mt-0">
      <v-container
        class="profile-reply-card d-flex justify-space-between align-start"
      >
        <router-link :to="`/users/${tweet.replyUserId}`" class="links">
          <v-avatar size="50" class="pt-0">
            <v-img :src="tweet.replyAvatar" :alt="tweet.replyName" />
          </v-avatar>
        </router-link>

        <v-card-text class="py-0">
          <v-list-item-title>
            <span class="mr-2 tweets-user-name">{{ tweet.replyName }}</span>
            <template v-if="$vuetify.breakpoint.xsOnly">
              <br />
            </template>
            <span class="tweets-user-account"
              >@{{ tweet.replyAccount }}·{{ tweet.replyCreatedAt | fromNow }}
            </span>
          </v-list-item-title>
          <v-list-item-subtitle>
            <span class="tweets-user-account mr-1">回覆給</span>
            <span class="reply-target"
              >@{{ tweet.tweetAuthorAccount }}</span
            ></v-list-item-subtitle
          >
          <v-list-item-content class="pt-2 pb-2 reply-description">
            {{ tweet.replyComment }}
          </v-list-item-content>
        </v-card-text>
      </v-container>
      <v-container class="profile-reply-card d-flex align-start">
        <router-link :to="`/users/${tweet.tweetAuthorId}`" class="links">
          <v-avatar size="50" class="tweet-card-avatar">
            <v-img
              :src="tweet.tweetAuthorAvatar"
              :alt="tweet.tweetAuthorName"
            />
          </v-avatar>
        </router-link>
        <router-link :to="`/tweets/${tweet.tweetId}`" class="links">
          <v-card-text class="py-0">
            <v-list-item-title>
              <span class="mr-2 tweets-user-name">{{
                tweet.tweetAuthorName
              }}</span>
              <template v-if="$vuetify.breakpoint.xsOnly">
                <br />
              </template>
              <span class="tweets-user-account"
                >@{{ tweet.tweetAuthorAccount }}·{{
                  tweet.tweetCreatedAt | fromNow
                }}
              </span>
            </v-list-item-title>
            <v-list-item-content class="pt-2 pb-2 reply-description">
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
