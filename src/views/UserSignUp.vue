<template>
  <v-sheet max-width="540px">
    <v-card-actions class="sign-logo">
      <v-img
        src="../assets/img/logo.svg"
        max-width="50px"
        max-height="50px"
      ></v-img>
    </v-card-actions>
    <v-card-title class="sign-title">建立你的帳號</v-card-title>
    <UserForm :in-is-sign-up="isSignUp" />
    <v-card-actions class="pt-5 cancel-link justify-center">
      <v-btn text :to="'/signin'" class="sign-link">取消</v-btn></v-card-actions
    >
  </v-sheet>
</template>

<script>
import UserForm from "../components/UserForm.vue";
export default {
  name: "UserSignUp",
  components: {
    UserForm,
  },
  data() {
    return {
      isSignUp: true,
    };
  },
};
</script>
<style lang="scss">
@import "../assets/scss/components/_UserSignIn.scss";
</style>
