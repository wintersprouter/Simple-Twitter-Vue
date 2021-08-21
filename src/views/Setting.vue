<template>
  <v-container>
    <v-row>
      <section class="left-section"><Navbar /></section>
      <section class="main-section"><UserForm /></section>
    </v-row>
  </v-container>
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


