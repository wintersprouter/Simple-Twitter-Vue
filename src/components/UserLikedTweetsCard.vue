<template>
  <v-card elevation="0" tile class="tweet-list" max-width="600px">
    <v-card elevation="0" class="tweet-card">
      <v-container class="d-flex justify-space-between">
        <router-link :to="`/users/${tweet.likedTweetUserId}`" class="links">
          <v-avatar size="50" class="tweet-card-avatar mt-2">
            <v-img :src="tweet.avatar" :alt="tweet.name" />
          </v-avatar>
        </router-link>
        <v-list class="tweet-card-list">
          <v-card-text class="py-0">
            <router-link :to="`/tweets/${tweet.TweetId}`" class="links">
              <v-list-item-group>
                <v-list-item-title>
                  <span class="mr-1 tweets-user-name">{{ tweet.name }}</span>
                  <template v-if="$vuetify.breakpoint.xsOnly">
                    <br />
                  </template>
                  <span class="tweets-user-account"
                    >@{{ tweet.account }}·{{ tweet.tweetCreatedAt | fromNow }}
                  </span>
                </v-list-item-title>
                <v-list-item-content class="tweets-description pt-2 pb-2">
                  {{ tweet.description }}
                </v-list-item-content>
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
              <ReplyLikedTweetModal
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
      </v-container>
    </v-card>
    <v-divider></v-divider>
  </v-card>
</template>
<script>
import ReplyLikedTweetModal from "./../components/ReplyLikedTweetModal";
import tweetsAPI from "../apis/tweets";
import { Toast } from "../utils/helpers";
import { fromNowFilter } from "../utils/mixins";
import { mapState } from "vuex";

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
    ReplyLikedTweetModal,
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
        const { data } = await tweetsAPI.postLike(tweet.TweetId);
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
        const { data } = await tweetsAPI.postUnlike(tweet.TweetId);
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
      if (this.tweet.TweetId === comment.TweetId) {
        this.tweet.repliedCount += 1;
        this.dialog = false;
      }
    },
    afterClickClose() {
      this.dialog = false;
    },
  },
  computed: {
    ...mapState(["currentUser"]),
  },
};
</script>
<style lang="scss" scoped>
.tweet-list {
  width: 100%;
  padding: 0;
  margin: 0;
  .tweet-card {
    width: 100%;
    margin: 0 auto;
    padding: 0 15px;

    .tweet-card-list {
      margin-top: 0;
      margin-left: 0;
      .v-list-item-group {
        max-width: 480px;
        .tweet-card-description {
          max-width: 490px;
          padding: 0;
        }
      }
    }
  }
}
</style>
