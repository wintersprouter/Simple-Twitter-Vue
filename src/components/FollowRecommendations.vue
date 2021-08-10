<template>
  <v-container>
    <v-card
      class="
        pa-4
        text-left
        secondary
        text-no-wrap
        rounded-t-xl
        font-weight-bold;
      "
      max-width="344"
      outlined
    >
      跟隨誰
    </v-card>

    <v-card class="secondary" max-width="344" outlined>
      <v-divider class="mb-2"></v-divider>
      <v-row align="center" justify="space-around">
        <div class="user-info d-flex">
          <v-list-item two-line>
            <v-list-item-avatar
              class="user-info-avatar"
              color="warning lighten-2"
              size="50"
            >
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-list-item-avatar>
            <v-list-item-content class="user-info-text">
              <v-list-item-title class="user-info-text-name"
                >SALLY</v-list-item-title
              >
              <v-list-item-subtitle class="user-info-text-account"
                >@SALLY</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </div>
        <v-card-actions class="followship-button">
          <!-- <v-btn rounded color="primary" dark> 正在跟隨 </v-btn> -->
          <v-btn rounded outlined color="primary" dark> 跟隨</v-btn>
        </v-card-actions>
      </v-row>
      <v-divider class="mt-2"></v-divider>
    </v-card>
    <v-card
      class="pa-4 text-left secondary text-no-wrap rounded-b-xl"
      max-width="344"
      outlined
    >
      顯示更多
    </v-card>
  </v-container>
</template>
<script>
export default {};
</script>
<style scoped>
</style>
