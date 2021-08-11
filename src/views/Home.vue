<template>
  <v-main>
    <v-container>
      <v-row>
        <section class="left-section"><Navbar /></section>
        <section class="middle-section"><Tweets /></section>
        <section class="right-section"><FollowRecommendations /></section>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import Navbar from "./../components/Navbar";
import FollowRecommendations from "./../components/FollowRecommendations";
import Tweets from "./../components/Tweets";

export default {
  name: "Home",
  components: {
    Navbar,
    Tweets,
    FollowRecommendations,
  },
};
</script>
<style scoped>
.v-main {
  width: 67%;
  margin: 0 auto;
}
.v-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}

.v-row {
  margin: 0 auto;
}
.left-section {
  order: 0;
  flex-grow: 0;
  flex-shrink: 0.5;
  flex-basis: 18.3%;
  /* 235px */
}
.middle-section {
  order: 1;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 46.9%;
  margin: 0 10px 0 10px;
  /* 600px */
}

.right-section {
  order: 2;
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: 27.3%;
  /* 350px */
}
</style>
