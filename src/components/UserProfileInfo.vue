<template>
  <v-card elevation="0" outlined tile>
    <v-img
      height="200px"
      src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
    >
      <v-avatar size="140" class="profile-avatar mt-15">
        <img
          alt="user"
          src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg"
        />
      </v-avatar>
    </v-img>
    <v-card-text>
      <v-card-actions>
        <v-row class="flex-row-reverse">
          <v-btn outlined color="primary" class="text-no-wrap rounded-pill"
            >編輯個人資料</v-btn
          >
        </v-row>
      </v-card-actions>
      <v-list class="pt-1 ml-1" align="start">
        <v-list-item-title class="tweets-name">MasterCard</v-list-item-title>
        <v-list-item-subtitle class="tweets-account"
          >@MasterCard</v-list-item-subtitle
        >
      </v-list>
      <v-card-text
        >Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
        sint.
      </v-card-text>
      <v-card-subtitle
        ><span>34 個跟隨中 </span> <span> 59 位跟隨者</span></v-card-subtitle
      >
    </v-card-text>
  </v-card>
</template>
<style lang="scss">
.profile-avatar {
  border: 4px solid #ffffff;
  box-sizing: border-box;
}
</style>
