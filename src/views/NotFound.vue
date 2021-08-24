<template>
  <v-card height="100vh" elevation="0">
    <v-card-title class="mb-0 pb-0"
      ><v-spacer></v-spacer>
      <h2>404 Page Not Found</h2>
      <v-spacer></v-spacer
    ></v-card-title>
    <v-img
      src="../assets/img/404.svg"
      width="80%"
      height="80%"
      class="mx-auto"
    ></v-img>
    <v-card-actions
      ><v-spacer></v-spacer
      ><v-btn elevation="2" x-large color="primary" @click="$router.go(-2)">
        Back
      </v-btn></v-card-actions
    >
  </v-card>
</template>
<script>
export default {
  name: "NotFound",
};
</script>
