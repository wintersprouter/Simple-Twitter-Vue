<template>
  <v-sheet max-width="540px">
    <v-card-actions class="sign-logo">
      <v-img
        src="../assets/img/logo.svg"
        max-width="50px"
        max-height="50px"
      ></v-img>
    </v-card-actions>
    <v-card-title class="sign-title">登入Twitter</v-card-title>
    <SignInForm />

    <v-card-actions class="pt-5"
      ><v-spacer></v-spacer>
      <router-link :to="'/signup'" class="sign-link">註冊Twitter</router-link
      ><span class="sign-link">·</span
      ><router-link :to="'/admin/signin'" class="sign-link"
        >後台登入</router-link
      ></v-card-actions
    >
  </v-sheet>
</template>
<script>
import SignInForm from "../components/SignInForm.vue";
export default {
  name: "UserSiginIn",
  components: {
    SignInForm,
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/components/_UserSignIn.scss";
</style>
