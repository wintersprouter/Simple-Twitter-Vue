<template>
  <div class="container d-flex pa-0">
    <section class="left-section"><Navbar /></section>
    <section class="main-section">
      <v-card elevation="0" height="55px"
        ><v-card-title class="header-title">帳戶設定</v-card-title>
      </v-card>
      <v-divider></v-divider>
      <v-col cols="6">
        <UserForm />
      </v-col>
    </section>
  </div>
</template>
<script>
import Navbar from "./../components/Navbar";
import UserForm from "./../components/UserForm.vue";
import { mapState } from "vuex";

export default {
  name: "Setting",
  components: {
    Navbar,
    UserForm,
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
};
</script>
