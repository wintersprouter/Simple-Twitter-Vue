<template>
  <v-card elevation="0" outlined tile class="reply-list">
    <v-card elevation="0" class="reply-card">
      <v-card-text class="ml-1">
        <v-row>
          <v-avatar size="50" class="tweet-card-avatar mb-2">
            <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="MasterCard"
            />
          </v-avatar>
          <v-list class="pt-1 ml-1">
            <v-list-item-title class="ml-1">
              <span class="tweets-name">MasterCard</span>
              <span class="ml-1 tweets-account">@MasterCard</span>
              <span class="ml-1 tweets-account">· 13 小時</span>
            </v-list-item-title>
            <v-list-item-subtitle class="ml-1">
              <span class="tweets-account">回覆</span>
              <span class="reply-target ml-1">@dkfodko</span>
            </v-list-item-subtitle>
            <v-list-item-content class="reply-content ml-1"
              >Good Job!</v-list-item-content
            >
          </v-list>
        </v-row>
      </v-card-text>
    </v-card>
    <v-divider></v-divider>
    <v-card elevation="0" class="reply-card">
      <v-card-text class="ml-1">
        <v-row>
          <v-avatar size="50" class="tweet-card-avatar mb-2">
            <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="MasterCard"
            />
          </v-avatar>
          <v-list class="pt-1 ml-1">
            <v-list-item-title class="ml-1">
              <span class="tweets-name">MasterCard</span>
              <span class="ml-1 tweets-account">@MasterCard</span>
              <span class="ml-1 tweets-account">· 13 小時</span>
            </v-list-item-title>
            <v-list-item-subtitle class="ml-1">
              <span class="tweets-account">回覆</span>
              <span class="reply-target ml-1">@dkfodko</span>
            </v-list-item-subtitle>
            <v-list-item-content class="reply-content ml-1"
              >Good!</v-list-item-content
            >
          </v-list>
        </v-row>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
export default {
  name: "Replies",
};
</script>
<style lang="scss">
@import "../assets/scss/components/_Replies.scss";
</style>
