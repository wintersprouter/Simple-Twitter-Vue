<template>
  <v-card elevation="0">
    <v-card elevation="0" height="55px" class="header-card">
      <v-card-title class="header-title">推文清單</v-card-title>
    </v-card>
    <v-divider></v-divider>
    <v-container>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        class="elevation-1"
        :search="search"
        :headers="headers"
        :items="tweets"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-container>
  </v-card>
</template>
<script>
import tweetsAPI from "../apis/tweets";
import { Toast } from "./../utils/helpers";
// import AdminTweets from "../components/AdminTweets";
import { fromNowFilter } from "./../utils/mixins";
import moment from "moment";
export default {
  name: "AdminTweetsList",
  // components: {
  //   AdminTweets,
  // },
  mixins: [fromNowFilter],
  data() {
    return {
      tweets: [
        {
          id: -1,
          UserId: -1,
          account: "",
          description: "",
          createdAt: "",
          likedCount: "",
          repliedCount: "",
        },
      ],
      search: "",
      headers: [
        {
          text: "推文Id",
          value: "id",
        },
        { text: "作者Id", value: "UserId" },
        { text: "作者帳號", value: "account", sortable: false },
        {
          text: "推文內容",
          value: "description",
          align: "start",
          sortable: false,
        },
        { text: "推文時間", value: "createdAt" },
        { text: "推文讚數", value: "likedCount" },
        { text: "推文回文數", value: "repliedCount" },
        { text: "Action", value: "action", sortable: false },
      ],
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
        this.tweets = data.map((t) => {
          return {
            ...t,
            createdAt: moment(t.createdAt).format("LLL"),
            account: "@" + t.account,
            description:
              t.description.length > 50
                ? t.description.substring(0, 50) + "..."
                : t.description,
          };
        });
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
