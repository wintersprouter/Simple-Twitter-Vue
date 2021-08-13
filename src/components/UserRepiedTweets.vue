<template>
  <v-card elevation="0" relative>
    <v-list class="p-0">
      <v-container class="profile-reply-card">
        <v-avatar size="50" class="pt-0">
          <img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="MasterCard"
          />
        </v-avatar>
        <v-divider vertical inset class="my-2 connect-line"></v-divider>

        <v-card-text class="py-0">
          <v-list-item-title>
            <span class="mr-2 tweets-name">MasterCard</span>
            <span class="tweets-account">@MasterCard</span>
            <span class="tweets-account"> · </span>
            <span class="tweets-account"> 3 小時</span>
          </v-list-item-title>
          <v-list-item-subtitle>
            <span class="tweet-reply-title mr-1">回覆給</span>
            <span class="tweet-reply-target"
              >@aomorm</span
            ></v-list-item-subtitle
          >
          <v-list-item-content class="pt-2 pb-2">
            Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco
            cillum dolor. Voluptate exercitation incididunt aliquip deserunt
            reprehenderit elit laborum.
          </v-list-item-content>
        </v-card-text>
      </v-container>
      <v-container class="profile-reply-card">
        <v-avatar size="50" class="tweet-card-avatar">
          <img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="MasterCard"
          />
        </v-avatar>
        <v-card-text class="py-0">
          <v-list-item-title>
            <span class="mr-2 tweets-name">MasterCard</span>
            <span class="tweets-account">@MasterCard</span>
            <span class="tweets-account"> · </span>
            <span class="tweets-account"> 3 小時</span>
          </v-list-item-title>
          <v-list-item-content class="pt-2 pb-2">
            Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco
            cillum dolor. Voluptate exercitation incididunt aliquip deserunt
            reprehenderit elit laborum.
          </v-list-item-content>
        </v-card-text>
      </v-container>
    </v-list>
    <v-divider></v-divider>
  </v-card>
</template>
<script>
export default {
  name: "UserRepiedweets",
};
</script>
<style lang="scss">
@import "../assets/scss/components/_UserRepiedTweets.scss";
@import "../assets/scss/components/_ReplyTweetModal.scss";
</style>
