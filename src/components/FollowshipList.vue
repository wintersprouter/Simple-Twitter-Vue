<template>
  <v-card elevation="0">
    <v-container class="d-flex justify-space-between">
      <v-avatar size="50" class="tweet-card-avatar">
        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="MasterCard" />
      </v-avatar>

      <v-card-text class="py-0">
        <v-list-item-title class="followship-name mb-1"
          >MasterCard</v-list-item-title
        >
        <v-list-item-subtitle class="followship-account"
          >@MasterCard</v-list-item-subtitle
        >
        <v-list-item-content class="followship-intro pb-0 pt-1">
          Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco
          cillum dolor. Voluptate exercitation incididunt aliquip
        </v-list-item-content>
      </v-card-text>
      <!-- <v-btn rounded color="primary" elevation="0" dark class="px-4">
                正在跟隨
              </v-btn> -->
      <v-btn rounded outlined color="primary" class="px-4" dark> 跟隨</v-btn>
    </v-container>
    <v-divider></v-divider>
  </v-card>
</template>
<style lang="scss">
@import "../assets/scss/components/_FollowshipList.scss";
</style>
