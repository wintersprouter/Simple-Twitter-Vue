<template>
  <v-tabs>
    <v-tab v-for="tab in tabs" :key="tab.id">
      <router-link :to="tab.path" class="links">
        {{ tab.title }}
      </router-link>
    </v-tab>
  </v-tabs>
</template>
<script>
export default {
  data() {
    return {
      tabs: [
        {
          id: 1,
          title: "推文",
          path: `/users/${this.$route.params.id}/tweets`,
        },
        {
          id: 2,
          title: "推文與回覆",
          path: `/users/${this.$route.params.id}/repliedTweets`,
        },
        {
          id: 3,
          title: "喜歡的內容",
          path: `/users/${this.$route.params.id}/likedTweets`,
        },
      ],
    };
  },
  created() {
    const { id } = this.$route.params;
    this.fetchProfileInfo(id);
  },
};
</script>
