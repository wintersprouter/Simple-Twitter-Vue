<template>
  <v-sheet max-width="540px">
    <v-img
      src="../assets/img/logo.svg"
      max-width="50px"
      max-height="50px"
    ></v-img>
    <v-title>登入Twitter</v-title>
    <SignInForm />
    <v-card-actions
      ><v-spacer></v-spacer>
      <router-link :to="'/signup'">註冊Twitter</router-link><span>·</span
      ><router-link :to="'/admin/signin'">後台登入</router-link></v-card-actions
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
.v-sheet {
  margin: 3rem auto 0;
}
</style>
