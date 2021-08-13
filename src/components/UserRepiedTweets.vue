<template>
  <v-card elevation="0" class="profile-reply-card">
    <v-row>
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
      </v-list>
    </v-row>
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
</style>
