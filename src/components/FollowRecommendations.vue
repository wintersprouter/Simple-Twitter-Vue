<template>
  <v-container>
    <v-card class="secondary rounded-t-xl" max-width="350" outlined>
      <v-card-title class="text-left card-list-title">跟隨誰</v-card-title>
    </v-card>
    <v-card class="secondary" max-width="350" outlined>
      <v-divider></v-divider>
      <v-row align="center" justify="space-around">
        <v-list-item two-line class="ma-2">
          <v-list-item-avatar
            class="user-info-avatar"
            color="warning lighten-2"
            size="50"
          >
            <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="MasterCard"
            />
          </v-list-item-avatar>
          <v-list-item-content class="user-info-text">
            <v-list-item-title class="user-info-text-name"
              >MasterCard</v-list-item-title
            >
            <v-list-item-subtitle class="user-info-text-account"
              >@MasterCard</v-list-item-subtitle
            >
          </v-list-item-content>
          <v-card-actions class="followship-button">
            <v-btn rounded color="primary" dark> 正在跟隨 </v-btn>
            <!-- <v-btn rounded outlined color="primary" dark> 跟隨</v-btn> -->
          </v-card-actions>
        </v-list-item>
      </v-row>
      <v-divider></v-divider>
    </v-card>
    <v-card class="text-left secondary rounded-b-xl" max-width="350" outlined>
      <v-card-text id="show-more-cards">顯示更多</v-card-text>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: "FollowRecommendations",
};
</script>
<style lang="scss">
@import "./../assets/scss/components/_FollowRecommendations.scss";
</style>

