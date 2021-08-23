<template>
  <AdminUsers />
</template>

<script>
import AdminUsers from "./AdminUsers.vue";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";
export default {
  name: "AdminUsersList",
  components: {
    AdminUsers,
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
        this.user = data;
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
