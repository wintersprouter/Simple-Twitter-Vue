<template>
  <v-card elevation="0">
    <v-card elevation="0" height="55px" class="header-card">
      <v-card-title class="header-title">推文清單</v-card-title>
    </v-card>
    <v-divider></v-divider>
    <v-container>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">推文Id</th>
              <th class="text-left">作者Id</th>
              <th class="text-left">作者帳號</th>
              <th class="text-left">推文內容</th>
              <th class="text-left">推文時間</th>
              <th class="text-left">推文讚數</th>
              <th class="text-left">推文回文數</th>
              <th class="text-left">推文刪除</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tweet in tweets" :key="tweet.id" :initial-tweet="tweet">
              <td>{{ tweet.id }}</td>
              <td>{{ tweet.UserId }}</td>
              <td>@{{ tweet.account }}</td>
              <td>{{ tweet.description | preview }}</td>
              <td>{{ tweet.createdAt | format }}</td>
              <td>{{ tweet.likedCount }}</td>
              <td>{{ tweet.repliedCount }}</td>
              <td>
                <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </v-card>
</template>
<script>
import tweetsAPI from "../apis/tweets";
import { Toast } from "./../utils/helpers";
// import AdminTweets from "../components/AdminTweets";
import { fromNowFilter, tweetFilter } from "./../utils/mixins";
export default {
  name: "AdminTweetsList",
  // components: {
  //   AdminTweets,
  // },
  mixins: [fromNowFilter, tweetFilter],
  data() {
    return {
      tweets: [],
    };
  },
  watch: {
    initialTweets(newValue) {
      this.tweets = [...newValue];
    },
  },
  created() {
    this.fetchTweets();
  },
  methods: {
    async fetchTweets() {
      try {
        const { data } = await tweetsAPI.getTweets();
        this.tweets = data;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得推文資料，請稍後再試",
        });
        console.log("error", error);
      }
    },
  },
};
</script>
