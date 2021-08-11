<template>
  <v-card elevation="0" outlined tile class="tweet-list">
    <v-card elevation="0" class="tweet-card">
      <v-avatar size="50" class="tweet-card-avatar">
        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="MasterCard" />
      </v-avatar>
      <v-list class="tweet-card-list">
        <v-card-text class="py-0">
          <v-list-item-group>
            <v-list-item-title>
              <span class="mr-2 tweets-name">MasterCard</span>
              <span class="tweets-account">@MasterCard</span>
              <span class="tweets-account"> · </span>
              <span class="tweets-account"> 3 小時</span>
            </v-list-item-title>
            <v-list-item-content class="pt-2 pb-0">
              Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
              ullamco cillum dolor. Voluptate exercitation incididunt aliquip
              deserunt reprehenderit elit laborum.
            </v-list-item-content>
          </v-list-item-group>
        </v-card-text>

        <v-card-actions class="py-0">
          <v-list-item>
            <v-btn icon color="pink">
              <v-icon>mdi-heart-outline</v-icon>
              <!-- <v-btn icon color="pink">
          <v-icon>mdi-heart</v-icon>
        </v-btn> -->
            </v-btn>
            <span>17</span>
          </v-list-item>
          <v-list-item>
            <v-dialog v-model="dialog" max-width="600px" max-hight="300px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon color="pink" v-bind="attrs" v-on="on">
                  <v-icon>mdi-message-reply-outline</v-icon>
                </v-btn>
              </template>
              <!-- modal -->
              <ReplyTweetModal />
            </v-dialog>
            <span>545</span>
          </v-list-item>
        </v-card-actions>
      </v-list>
    </v-card>
    <v-divider></v-divider>
  </v-card>
</template>
<script>
import ReplyTweetModal from "./../components/ReplyTweetModal";
export default {
  name: "Tweets",
  components: {
    ReplyTweetModal,
  },
  data: () => {
    return {
      dialog: false,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./../assets/scss/components/_Tweets.scss";
</style>
