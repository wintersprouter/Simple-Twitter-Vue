<template>
  <v-card elevation="0">
    <v-card elevation="0" height="55px" class="header-card">
      <v-card-title class="header-title">使用者列表</v-card-title>
    </v-card>
    <v-divider></v-divider>
    <v-container>
      <v-row class="mb-6" no-gutters>
        <UserLoading v-if="isLoading" />
        <template v-else>
          <AdminUserCard
            v-for="user in users"
            :key="user.id"
            :initial-user="user"
          />
        </template>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import AdminUserCard from "./AdminUserCard.vue";
import adminAPI from "../apis/admin";
import { Toast } from "../utils/helpers";
import UserLoading from "./../components/UserLoading";
export default {
  name: "AdminUsersList",
  components: {
    AdminUserCard,
    UserLoading,
  },
  data() {
    return {
      users: [],
      isLoading: false,
    };
  },
  methods: {
    async fetchUsers() {
      try {
        this.isLoading = true;
        const { data } = await adminAPI.getUsers();
        this.users = data;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
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
