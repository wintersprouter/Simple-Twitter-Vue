<template>
  <v-card elevation="0" outlined tile class="tweet-list">
    <v-card elevation="0" class="tweet-card">
      <v-avatar size="50" class="tweet-card-avatar">
        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="MasterCard" />
      </v-avatar>
      <v-list class="tweet-card-list">
        <v-card-text id="tweet-card-text">
          <v-list-item-group>
            <v-list-item-title>
              <span class="mr-2">MasterCard</span>
              <span>@MasterCard</span> <span> · </span> <span> 3 小時</span>
            </v-list-item-title>
            <v-list-item-content>
              Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
              ullamco cillum dolor. Voluptate exercitation incididunt aliquip
              deserunt reprehenderit elit laborum.
            </v-list-item-content>
          </v-list-item-group>
        </v-card-text>

        <v-card-actions id="tweet-card-actions">
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
            <v-btn icon color="pink">
              <v-icon>mdi-message-reply-outline</v-icon>
            </v-btn>
            <span>545</span>
          </v-list-item>
        </v-card-actions>
      </v-list>
    </v-card>
    <v-divider></v-divider>
  </v-card>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
@import "./../assets/scss/components/_UserTweets.scss";
</style>
