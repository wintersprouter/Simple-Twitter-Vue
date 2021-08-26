<template>
  <v-container>
    <v-row>
      <section class="left-section">
        <Navbar @after-post-tweet="updateTweet" />
      </section>
      <section class="middle-section">
        <Spinner v-if="isLoading" />
        <template v-else>
          <v-card elevation="0" height="55px" class="mt-0"
            ><v-card-title class="header-title">首頁</v-card-title></v-card
          >
          <v-divider></v-divider>
          <v-card elevation="0" class="mt-0">
            <v-form @submit.stop.prevent="handleSubmit()">
              <v-container class="d-flex justify-space-between px-4 pt-4 pb-0">
                <v-avatar size="50" class="mr-5">
                  <v-img
                    :src="currentUser.avatar"
                    :alt="'@' + currentUser.account"
                  />
                </v-avatar>
                <v-textarea
                  v-model="text"
                  counter
                  maxlength="140"
                  auto-grow
                  row-height="5"
                  placeholder="有什麼新鮮事？"
                  class="pt-2"
                ></v-textarea>
              </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  rounded
                  depressed
                  type="submit"
                  class="mt-0 mb-2 mr-3"
                  :disabled="isProcessing"
                >
                  推文
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
          <v-divider></v-divider>
          <UserTweets
            v-for="tweet in tweets"
            :key="tweet.id"
            :initial-tweet="tweet"
          />
        </template>
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
import UserTweets from "./../components/UserTweets";
import { mapState } from "vuex";
import tweetsAPI from "../apis/tweets";
import { Toast } from "./../utils/helpers";
import Spinner from "./../components/Spinner.vue";

export default {
  name: "Home",
  data() {
    return {
      tweets: [],
      text: "",
      isProcessing: false,
      newTweet: {},
      isLoading: false,
    };
  },
  watch: {
    initialTweets(newValue) {
      this.tweets = [...newValue];
    },
  },
  components: {
    Navbar,
    UserTweets,
    FollowRecommendations,
    Spinner,
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated", "topUsers"]),
  },
  created() {
    this.fetchTweets();
  },
  methods: {
    async fetchTweets() {
      try {
        this.isLoading = true;
        const { data } = await tweetsAPI.getTweets();
        this.tweets = data;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得推文資料，請稍後再試",
        });
        console.log("error", error);
      }
    },
    async handleSubmit() {
      try {
        if (!this.text) {
          Toast.fire({ icon: "warning", title: "您尚未填寫任何內容" });
          return;
        }
        if (this.text.trim().length > 140) {
          Toast.fire({ icon: "warning", title: "推文內容不得超過 140 字" });
          return;
        }
        this.isProcessing = true;

        const { data } = await tweetsAPI.postTweet({
          description: this.text,
        });
        console.log(data);
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        const tweet = {
          createdAt: new Date(),
          description: this.text,
        };
        this.updateTweet(tweet);

        this.text = "";
        this.isProcessing = false;

        Toast.fire({
          icon: "success",
          title: "新增推文成功",
        });
      } catch (error) {
        this.text = "";
        this.isProcessing = false;
        Toast.fire({ icon: "error", title: "無法新增推文，請稍後再試" });
      }
    },
    updateTweet(tweet) {
      const { id, avatar, name, account } = this.currentUser;
      const newTweet = {
        UserId: id,
        avatar,
        name,
        account,
        createdAt: tweet.createdAt,
        description: tweet.description,
        isLike: false,
        likedCount: 0,
        repliedCount: 0,
      };
      this.tweets.unshift(newTweet);
    },
  },
};
</script>
