<template>
  <v-sheet max-width="540px">
    <v-card-actions class="sign-logo">
      <v-img
        src="../assets/img/logo.svg"
        max-width="50px"
        max-height="50px"
      ></v-img>
    </v-card-actions>
    <v-card-title class="sign-title">後台登入</v-card-title>
    <SignInForm :in-is-admin-sign-page="isAdminSignPage" />
    <v-card-actions class="pt-5 justify-content-center sign-actions"
      ><v-spacer></v-spacer>
      <v-btn text :to="'/signin'" class="sign-link"
        >前台登入</v-btn
      ></v-card-actions
    >
  </v-sheet>
</template>
<script>
import SignInForm from "../components/SignInForm.vue";
export default {
  name: "AdminSignIn",
  components: {
    SignInForm,
  },
  data() {
    return {
      isAdminSignPage: true,
    };
  },
};
</script>
