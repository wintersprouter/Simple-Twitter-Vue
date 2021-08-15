<template>
  <v-card elevation="0" tile class="tweet-list">
    <v-card elevation="0" class="tweet-card">
      <v-avatar size="50" class="tweet-card-avatar">
        <img :src="tweet.avatar" :alt="tweet.name" />
      </v-avatar>
      <v-list class="tweet-card-list">
        <v-card-text class="py-0">
          <v-list-item-group>
            <v-list-item-title>
              <span class="mr-2 tweets-name">{{ tweet.name }}</span>
              <span class="tweets-account">@{{ tweet.account }}</span>
              <span class="tweets-account"> · </span>
              <span class="tweets-account">{{ tweet.createdAt }} </span>
            </v-list-item-title>
            <v-list-item-content class="pt-2 pb-0">
              {{ tweet.description }}
            </v-list-item-content>
          </v-list-item-group>
        </v-card-text>

        <v-card-actions class="pb-0 pt-1 justify-start">
          <v-dialog v-model="dialog" max-width="600px" max-hight="300px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon color="gary" v-bind="attrs" v-on="on">
                <v-icon>mdi-message-reply-outline</v-icon>
              </v-btn>
            </template>
            <!-- modal -->
            <ReplyTweetModal />
          </v-dialog>
          <span class="mr-8">{{ tweet.repliedCount }}</span>

          <v-btn v-if="tweet.isLike" icon color="pink">
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          <v-btn v-else icon color="gary">
            <v-icon>mdi-heart-outline</v-icon>
          </v-btn>
          <span>{{ tweet.likedCount }}</span>
        </v-card-actions>
      </v-list>
    </v-card>
    <v-divider></v-divider>
  </v-card>
</template>
<script>
import ReplyTweetModal from "./../components/ReplyTweetModal";
export default {
  name: "UserTweets",
  props: {
    initialTweet: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      tweet: this.initialTweet,
      dialog: false,
    };
  },
  components: {
    ReplyTweetModal,
  },
};
</script>
<style lang="scss" scoped>
@import "./../assets/scss/components/_UserTweets.scss";
</style>
