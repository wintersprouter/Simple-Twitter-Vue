<template>
  <v-card elevation="0" tile class="detail-tweet-card">
    <v-card-text class="ml-1">
      <v-row>
        <v-avatar size="50" class="tweet-card-avatar mb-2">
          <img :src="tweet.avatar" :alt="tweet.name" />
        </v-avatar>
        <v-list class="pt-1 ml-2">
          <v-list-item-title class="tweets-name">{{
            tweet.name
          }}</v-list-item-title>
          <v-list-item-subtitle class="tweets-account"
            >@{{ tweet.account }}</v-list-item-subtitle
          >
        </v-list>
      </v-row>
    </v-card-text>

    <v-card-text class="detail-tweet-card-content">
      <v-card-tilte class="detail-tweet-card-content">
        {{ tweet.description }}
      </v-card-tilte>
    </v-card-text>
    <v-card-subtitle class="detail-tweet-card-time">{{
      tweet.createdAt | fromNow
    }}</v-card-subtitle>

    <v-divider class="mx-1"></v-divider>

    <v-card-subtitle>
      <span class="tweet-card-reply-count">{{ tweet.repliedCount }}</span>
      <span class="tweet-card-reply-text mr-3">回覆</span>
      <span class="tweet-card-like-count">{{ tweet.likedCount }}</span>
      <span class="tweet-card-like-text">喜歡次數</span>
    </v-card-subtitle>

    <v-divider class="mx-1"></v-divider>

    <v-card-actions class="py-0">
      <v-list-item>
        <v-dialog v-model="dialog" max-width="600px" max-hight="300px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon color="gary" v-bind="attrs" v-on="on">
              <v-icon>mdi-message-reply-outline</v-icon>
            </v-btn>
          </template>
          <!-- modal -->
          <ReplyTweetModal
            :init-tweet="tweet"
            @after-create-reply="afterCreateReply(tweet)"
            @after-click-close="afterClickClose"
          />
        </v-dialog>
      </v-list-item>

      <v-list-item>
        <v-btn
          v-if="tweet.isLike"
          @click.stop.prevent="postUnlike(tweet)"
          :disabled="isProcessing"
          icon
          color="pink"
        >
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn
          v-else
          @click.stop.prevent="postLike(tweet)"
          :disabled="isProcessing"
          icon
          color="gary"
        >
          <v-icon>mdi-heart-outline</v-icon>
        </v-btn>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>
<script>
import ReplyTweetModal from "./ReplyTweetModal.vue";
import { fromNowFilter } from "./../utils/mixins";
export default {
  name: "UserTweet",
  components: {
    ReplyTweetModal,
  },
  props: {
    initialTweet: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tweet: this.initialTweet,
      dialog: false,
    };
  },
  watch: {
    initialTweet(newValue) {
      this.tweet = {
        ...this.tweet,
        ...newValue,
      };
    },
  },
  mixins: [fromNowFilter],
};
</script>
<style lang="scss">
@import "./../assets/scss/components/_UserTweet.scss";
@import "./../assets/scss/components/_UserTweets.scss";
</style>
