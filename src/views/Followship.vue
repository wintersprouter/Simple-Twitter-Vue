<template>
  <v-container>
    <v-row>
      <section class="left-section"><Navbar /></section>
      <section class="middle-section">
        <v-tabs center-active>
          <v-tab>跟隨者</v-tab>
          <v-tab>跟隨中</v-tab>
        </v-tabs>
        <v-divider></v-divider>
        <FollowshipList />
      </section>
      <section class="right-section"><FollowRecommendations /></section>
    </v-row>
  </v-container>
</template>
<script>
import Navbar from "./../components/Navbar";
import FollowRecommendations from "./../components/FollowRecommendations";
import FollowshipList from "./../components/FollowshipList";

export default {
  name: "Home",
  components: {
    Navbar,
    FollowRecommendations,
    FollowshipList,
  },
};
</script>
<style lang="scss">
@import "./../assets/scss/layout/ThreeColumn.scss";
</style>
