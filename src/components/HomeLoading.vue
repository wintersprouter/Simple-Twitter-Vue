<template>
  <section>
    <v-skeleton-loader
      v-bind="attrs"
      width="450px"
      type="list-item-avatar-three-line,actions,divider"
    ></v-skeleton-loader>
    <v-skeleton-loader
      v-bind="attrs"
      type="list-item-avatar-three-line,actions,divider"
    ></v-skeleton-loader>
    <v-skeleton-loader
      v-bind="attrs"
      type="list-item-avatar-three-line,actions,divider"
    ></v-skeleton-loader>
    <v-skeleton-loader
      v-bind="attrs"
      type="list-item-avatar-three-line,actions,divider"
    ></v-skeleton-loader>
  </section>
</template>
<script>
export default {
  data: () => ({
    attrs: {
      boilerplate: true,
      elevation: 0,
    },
  }),
};
</script>
