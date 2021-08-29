<template>
  <v-card elevation="0" style="border-radius: 14px" class="mt-0">
    <v-card-actions>
      <v-btn @click.stop.prevent="handleClick" icon
        ><span>&#10005;</span>
      </v-btn>
    </v-card-actions>
    <v-divider></v-divider>

    <v-card-actions>
      <v-container class="d-flex justify-space-between modal-top">
        <v-avatar size="50" class="tweet-card-avatar">
          <img :src="tweet.avatar" :alt="tweet.name" />
        </v-avatar>
        <v-divider vertical inset class="my-1" id="connect-line"></v-divider>

        <v-card-text class="py-0">
          <v-list-item-title>
            <span class="mr-2 tweets-user-name">{{ tweet.name }}</span>
            <span class="tweets-user-account">@{{ tweet.account }}</span>
            <span class="tweets-user-account"> · </span>
            <span class="tweets-user-account">
              {{ tweet.createdAt | fromNow }}</span
            >
          </v-list-item-title>
          <p class="pt-2 pb-1 pr-0 reply-description">
            {{ tweet.description }}
          </p>
          <v-list-item-subtitle>
            <span class="reply-modal-text">回覆給</span>
            <span class="reply-modal-target"
              >@{{ tweet.account }}</span
            ></v-list-item-subtitle
          >
        </v-card-text>
      </v-container>
    </v-card-actions>
    <v-form @submit.stop.prevent="handleSubmit(initTweet.id)">
      <v-card-actions>
        <v-container class="d-flex justify-space-between">
          <v-avatar size="50" class="ml-2 mr-5">
            <img :src="currentUser.avatar" :alt="currentUser.name" />
          </v-avatar>
          <v-textarea
            v-model="repliedContent"
            counter
            maxlength="50"
            auto-grow
            row-height="15"
            placeholder="推你的回覆"
            autofocus
            required
          ></v-textarea>
        </v-container>
      </v-card-actions>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          rounded
          elevation="0"
          type="submit"
          class="mb-5 mr-2"
          :disabled="isProcessing"
        >
          回覆
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
<script>
import { fromNowFilter } from "./../utils/mixins";
import { mapState } from "vuex";
import tweetsAPI from "./../apis/tweets";
import { Toast } from "./../utils/helpers";
export default {
  name: "ReplyTweetModal",
  props: {
    initTweet: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      repliedContent: "",
      tweet: this.initTweet,
      isProcessing: false,
      dialog: true,
    };
  },

  mixins: [fromNowFilter],
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    async handleSubmit(tweetId) {
      try {
        if (!this.repliedContent.trim().length) {
          Toast.fire({ icon: "warning", title: "您尚未填寫任何內容" });
          return;
        }
        this.isProcessing = true;
        const content = { comment: this.repliedContent.trim() };

        const { data } = await tweetsAPI.postReply({
          tweetId,
          comment: content.comment,
        });
        const nowTime = new Date();

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        const replyComment = {
          id: this.tweet.id,
          content: content.comment,
          nowTime,
        };
        this.repliedContent = "";

        this.$emit("after-create-reply", replyComment);

        Toast.fire({
          icon: "success",
          title: `回覆 @${this.tweet.account} 的推文成功`,
        });
      } catch (error) {
        this.repliedContent = "";
        this.isProcessing = false;
        Toast.fire({ icon: "error", title: "無法新增回文，請稍後再試" });
      }
    },
    handleClick() {
      this.$emit("after-click-close");
    },
  },
};
</script>
<style lang="scss" scoped>
.modal-top {
  position: relative;
  #connect-line {
    position: absolute;
    left: 6.5%;
    top: 50%;
    height: 80px;
  }
}
</style>
