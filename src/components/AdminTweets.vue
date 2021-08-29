<template>
  <v-card elevation="0" tile class="mt-0">
    <v-card elevation="0" height="55px" class="header-card mt-0" tile>
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
        :loading="isLoading"
        loading-text="Loading... Please wait"
      >
        <template v-slot:top>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this tweet?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn
                  color="error"
                  :loading="isLoading"
                  class="ma-1"
                  text
                  @click="deleteItemConfirm"
                  >Delete</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon small @click="deleteItem(item.id)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-container>
  </v-card>
</template>
<script>
import tweetsAPI from "../apis/tweets";
import { Toast } from "../utils/helpers";
import adminAPI from "../apis/admin";
import { fromNowFilter } from "../utils/mixins";
import moment from "moment";
export default {
  name: "AdminTweetsList",
  mixins: [fromNowFilter],
  data() {
    return {
      tweets: [
        {
          id: "",
          UserId: "",
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
          text: "tweet id",
          value: "id",
        },
        { text: "author id", value: "UserId" },
        { text: "author account", value: "account", sortable: false },
        {
          text: "tweet description",
          value: "description",
          align: "start",
          sortable: false,
        },
        { text: "tweet createdAt", value: "createdAt" },
        { text: "tweet likes", value: "likedCount" },
        { text: "tweet replies", value: "repliedCount" },
        { text: "action", value: "action", sortable: false },
      ],
      isLoading: false,
      dialogDelete: false,
      deleteItemId: -1,
    };
  },
  watch: {
    initialTweets(newValue) {
      this.tweets = [...newValue];
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.fetchTweets();
  },
  methods: {
    async fetchTweets() {
      try {
        this.isLoading = true;
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
    deleteItem(id) {
      this.deleteItemId = id;
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      try {
        let tweetId = this.deleteItemId;
        this.isLoading = true;
        const { data } = await adminAPI.deleteTweet({ tweetId });
        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.tweets = this.tweets.filter((tweet) => tweet.id !== tweetId);
        Toast.fire({
          icon: "success",
          title: `${data.message}`,
        });
        this.isLoading = false;
        this.closeDelete();
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法刪除此推文，請稍後再試",
        });
        this.isLoading = false;
        this.closeDelete();
      }
    },
    closeDelete() {
      this.dialogDelete = false;
      this.deleteItemId = -1;
    },
  },
};
</script>
