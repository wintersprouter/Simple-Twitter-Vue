<template>
  <div class="text-center spinner">
    <v-progress-circular
      indeterminate
      color="primary"
      class="circular"
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  name: "Spinner",
};
</script>
<style lang="scss" scoped>
.spinner {
  height: 100vh;
  .v-progress-circular {
    margin-top: 40vh;
  }
}
</style>
