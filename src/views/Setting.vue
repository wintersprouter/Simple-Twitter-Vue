<template>
  <div class="main-container d-flex pa-0">
    <section class="left-section"><Navbar /></section>
    <section class="main-section">
      <v-card elevation="0" height="55px" tile class="header-card mt-0">
        <v-card-title class="header-setting" max-width="600px"
          >帳戶設定</v-card-title
        >
      </v-card>
      <v-divider></v-divider>
      <v-col class="col-xs-12 col-sm-10 col-md-10 col-lg-10">
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
