<template>
  <v-container>
    <h1>Sign Up</h1>
    <section><UserForm /></section>
  </v-container>
</template>
<script>
import UserForm from "./../assets/scss/components/UserForm.vue";
export default {
  name: "UserSignUp",
  component: {
    UserForm,
  },
};
</script>
