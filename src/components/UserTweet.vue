<template>
  <v-card elevation="0" outlined tile class="detail-tweet-card">
    <v-card-text class="ml-1">
      <v-row>
        <v-avatar size="50" class="tweet-card-avatar mb-2">
          <img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="MasterCard"
          />
        </v-avatar>
        <v-list class="pt-1 ml-1" align="center">
          <v-list-item-title class="tweets-name">MasterCard</v-list-item-title>
          <v-list-item-subtitle class="tweets-account"
            >@MasterCard</v-list-item-subtitle
          >
        </v-list>
      </v-row>
    </v-card-text>

    <v-card-text class="detail-tweet-card-content">
      <v-card-tilte class="detail-tweet-card-content">
        這幾年我都有跟兒福聯盟合作，去年更演出短片參與推廣，非常榮幸。這次兒盟成立了「1420Hz兒少發聲平台」，針對台灣14歲到20歲兒少提供一個安全又能暢所欲言的網路平台。網站設計非常棒，註冊成為會員還可以編輯自己的專屬人物，論壇上的行為還可兌換寶石裝飾自己的聲星球（根本就是遊戲，也太可愛了吧！！）
      </v-card-tilte>
    </v-card-text>
    <v-card-subtitle class="detail-tweet-card-time"
      >上午 10:05・2020年6月10日</v-card-subtitle
    >

    <v-divider class="mx-1"></v-divider>

    <v-card-subtitle>
      <span class="tweet-card-reply-count">34</span>
      <span class="tweet-card-reply-text mr-3">回覆</span>
      <span class="tweet-card-like-count">808</span>
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
          <ReplyTweetModal />
        </v-dialog>
      </v-list-item>

      <v-list-item>
        <v-btn icon color="gary">
          <v-icon>mdi-heart-outline</v-icon>
          <!-- <v-btn icon color="pink">
          <v-icon>mdi-heart</v-icon>
        </v-btn> -->
        </v-btn>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>
<script>
import ReplyTweetModal from "./ReplyTweetModal.vue";
export default {
  name: "UserTweet",
  components: {
    ReplyTweetModal,
  },
};
</script>
<style lang="scss">
@import "./../assets/scss/components/_UserTweet.scss";
@import "./../assets/scss/components/_UserTweets.scss";
</style>
