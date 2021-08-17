<template>
  <v-card elevation="0" tile class="detail-tweet-card">
    <v-card-text class="ml-1">
      <v-row>
        <router-link
          :to="{ name: 'users', query: { id: tweet.UserId } }"
          class="links"
        >
          <v-avatar size="50" class="tweet-card-avatar mb-2">
            <img :src="tweet.avatar" :alt="tweet.name" />
          </v-avatar>
        </router-link>
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
      <span class="tweet-card-reply-count mr-1">{{ tweet.repliedCount }}</span>
      <span class="tweet-card-reply-text mr-3">回覆</span>
      <span class="tweet-card-like-count mr-1">{{ tweet.likedCount }}</span>
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
import tweetsAPI from "./../apis/tweets";
import { Toast } from "./../utils/helpers";
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
      isProcessing: false,
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
  methods: {
    async postLike(tweet) {
      try {
        this.isProcessing = true;
        const { data } = await tweetsAPI.postLike(tweet.id);
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        tweet.isLike = !tweet.isLike;
        tweet.likedCount += 1;
        this.isProcessing = false;
        Toast.fire({
          icon: "success",
          title: `對 @${this.tweet.account} 的推文按讚`,
        });
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: `無法對 @${this.tweet.account} 的推文按讚，請稍後再試`,
        });
        console.log("error", error);
      }
    },
    async postUnlike(tweet) {
      try {
        this.isProcessing = true;
        const { data } = await tweetsAPI.postUnlike(tweet.id);
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        tweet.isLike = !tweet.isLike;
        tweet.likedCount -= 1;
        this.isProcessing = false;
        Toast.fire({
          icon: "success",
          title: `收回對 @${this.tweet.account} 推文按的讚`,
        });
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: `無法收回對 @${this.tweet.account} 推文按的讚，請稍後再試`,
        });
        console.log("error", error);
      }
    },
    afterCreateReply(comment) {
      if (this.tweet.id === comment.id) {
        this.tweet.repliedCount += 1;
        this.dialog = false;
      }
    },
    afterClickClose() {
      this.dialog = false;
    },
  },
};
</script>
<style lang="scss">
@import "./../assets/scss/components/_UserTweet.scss";
@import "./../assets/scss/components/_UserTweets.scss";
</style>
