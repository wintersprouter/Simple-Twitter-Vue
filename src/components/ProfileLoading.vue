<template>
  <v-skeleton-loader
    v-bind="attrs"
    type="list-item-two-line, divider, card-avatar, list-item-three-line"
  ></v-skeleton-loader>
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
