<template>
  <v-card elevation="0" tile class="tweet-list">
    <v-card elevation="0" class="tweet-card">
      <router-link :to="`/users/${tweet.UserId}`" class="links">
        <v-avatar size="50" class="tweet-card-avatar">
          <img :src="tweet.avatar" :alt="tweet.name" class="image" />
        </v-avatar>
      </router-link>
      <v-list class="tweet-card-list">
        <v-card-text class="py-0">
          <router-link :to="`/tweets/${tweet.id}`" class="links">
            <v-list-item-group>
              <v-list-item-title>
                <span class="mr-2 tweets-name">{{ tweet.name }}</span>
                <span class="tweets-account">@{{ tweet.account }}</span>
                <span class="tweets-account"> · </span>
                <span class="tweets-account"
                  >{{ tweet.createdAt | fromNow }}
                </span>
              </v-list-item-title>
              <v-list-item-action-text class="pt-2 pb-0 tweet-card-description">
                {{ tweet.description }}
              </v-list-item-action-text>
            </v-list-item-group>
          </router-link>
        </v-card-text>

        <v-card-actions class="pb-0 pt-1 justify-start">
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
          <span class="mr-8 tweet-card-count">{{ tweet.repliedCount }}</span>

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
          <span class="tweet-card-count">{{ tweet.likedCount }}</span>
        </v-card-actions>
      </v-list>
    </v-card>
    <v-divider></v-divider>
  </v-card>
</template>
<script>
import ReplyTweetModal from "./../components/ReplyTweetModal";
import tweetsAPI from "./../apis/tweets";
import { Toast } from "./../utils/helpers";
import { fromNowFilter } from "./../utils/mixins";

export default {
  name: "UserTweets",
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
  components: {
    ReplyTweetModal,
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
