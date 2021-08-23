<template>
  <v-card elevation="0">
    <v-container>
      <v-row class="mb-6" no-gutters>
        <AdminUserCard
          v-for="user in users"
          :key="user.id"
          :initial-user="user"
        />
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import AdminUserCard from "./AdminUserCard.vue";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";
export default {
  name: "AdminUsersList",
  components: {
    AdminUserCard,
  },
  data() {
    return {
      users: [],
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const { data } = await adminAPI.getUsers();
        this.users = data;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得使用者名單，請稍後再試",
        });
        console.log("error", error);
      }
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>
<style lang="scss">
</style>
