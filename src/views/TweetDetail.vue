<template>
  <v-container>
    <v-row>
      <section class="left-section"><Navbar /></section>
      <section class="middle-section">
        <v-card elevation="0" height="55px">
          <v-container class="d-flex p-0">
            <v-btn icon @click="$router.back()">
              <v-icon color="black">mdi-arrow-left</v-icon>
            </v-btn>
            <v-card-title class="header-title py-0">推文</v-card-title>
          </v-container>
        </v-card>
        <v-divider></v-divider>
        <TweetLoading v-if="isLoading" />
        <template v-else>
          <v-card elevation="0" tile class="detail-tweet-card">
            <v-card-text class="ml-1">
              <v-row>
                <router-link :to="`/users/${tweet.UserId}`" class="links">
                  <v-avatar size="50" class="tweet-card-avatar mb-2">
                    <img :src="tweet.avatar" :alt="tweet.name" class="image" />
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
              <p class="detail-tweet-card-content">
                {{ tweet.description }}
              </p>
            </v-card-text>
            <v-card-subtitle class="detail-tweet-card-time">{{
              tweet.createdAt | fromNow
            }}</v-card-subtitle>

            <v-divider class="mx-1"></v-divider>

            <v-card-subtitle>
              <span class="tweet-card-reply-count mr-1">{{
                tweet.repliedCount
              }}</span>
              <span class="tweet-card-reply-text mr-3">回覆</span>
              <span class="tweet-card-like-count mr-1">{{
                tweet.likedCount
              }}</span>
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
                    @after-create-reply="afterCreateReply"
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
        <v-divider></v-divider> <TweetsLoading v-if="isLoading" />
        <template v-else><Replies :init-replies="replies" /></template>
      </section>
      <section class="right-section">
        <FollowRecommendations :initial-top-users="topUsers" />
      </section>
    </v-row>
  </v-container>
</template>
<script>
import Navbar from "./../components/Navbar";
import FollowRecommendations from "./../components/FollowRecommendations";
import Replies from "./../components/Replies";
import ReplyTweetModal from "./../components/ReplyTweetModal.vue";
import { fromNowFilter } from "./../utils/mixins";
import { mapState } from "vuex";
import tweetsAPI from "../apis/tweets";
import { Toast } from "./../utils/helpers";
import TweetLoading from "../components/TweetLoading.vue";
import TweetsLoading from "../components/TweetsLoading.vue";

export default {
  name: "TweetDetail",
  components: {
    Navbar,
    Replies,
    FollowRecommendations,
    ReplyTweetModal,
    TweetLoading,
    TweetsLoading,
  },
  data() {
    return {
      tweet: {},
      replies: [],
      dialog: false,
      isProcessing: false,
      isLoading: false,
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
  created() {
    const { id } = this.$route.params;
    this.fetchTweet(id);
    this.fetchReplies(id);
  },
  computed: {
    ...mapState(["currentUser", "topUsers"]),
  },
  methods: {
    async fetchTweet(tweetId) {
      try {
        this.isLoading = true;
        const { data } = await tweetsAPI.getTweet(tweetId);
        this.tweet = data;
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得推文資料，請稍後再試",
        });
        this.$router.push("/404");
        console.log("error", error);
      }
    },
    async fetchReplies(tweetId) {
      try {
        this.isLoading = true;
        const { data } = await tweetsAPI.getReplies(tweetId);
        this.replies = data;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得回文資料，請稍後再試",
        });
        console.log("error", error);
      }
    },
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
    afterCreateReply(replyComment) {
      this.dialog = false;
      const reply = {
        id: replyComment.id,
        UserId: this.currentUser.id,
        tweetAuthorAccount: this.tweet.account,
        TweetId: this.tweet.id,
        comment: replyComment.content,
        commentAccount: this.currentUser.account,
        name: this.currentUser.name,
        avatar: this.currentUser.avatar,
        creatAt: replyComment.nowTime,
      };
      this.tweet.repliedCount += 1;

      this.replies.unshift(reply);
    },
    afterClickClose() {
      this.dialog = false;
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchTweet(to.params.id);
    this.fetchReplies(to.params.id);
    next();
  },
};
</script>
<style lang="scss">
@import "./../assets/scss/layout/ThreeColumn.scss";
@import "./../assets/scss/components/_UserTweet.scss";
@import "./../assets/scss/components/_UserTweets.scss";
</style>
