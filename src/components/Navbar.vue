<template>
  <v-card height="100vh" width="335" absolute left tile>
    <v-container>
      <v-list
        flat
        rounded
        nav
        class="ml-15 pl-10 pr-10 d-flex flex-column justify-space-around"
      >
        <!-- user -->
        <v-list-item-group v-model="selectedItem" color="primary">
          <!-- logo -->
          <router-link to="/">
            <v-btn icon color="primary" class="mx-4">
              <v-img src="../assets/img/logo.svg" max-width="20"></v-img>
            </v-btn>
          </router-link>
          <!-- logo-end -->
          <v-list-item
            v-for="userOption in userOptions"
            :key="userOption.id"
            link
            class="mt-5"
          >
            <v-list-item-icon class="mx-4">
              <v-img :src="userOption.icon" :alt="userOption.name"></v-img>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                v-text="userOption.title"
                class="font-weight-bold text-left"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-btn block color="primary" dark class="mt-2 rounded-pill"
            ><v-list-item-title class="font-weight-medium">
              推文</v-list-item-title
            >
          </v-btn>
        </v-list-item-group>
        <!-- user-end -->

        <!-- logout -->
        <v-list-item>
          <v-list-item-icon class="mx-4">
            <v-img src="../assets/img/logout.svg" max-width="20"></v-img>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold text-left ml-4"
                >登出</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item-icon>
        </v-list-item>
        <!-- logout -->
      </v-list>
    </v-container>
  </v-card>
</template>
<script>
import home from "./../assets/img/home.svg";
import user from "./../assets/img/user.svg";
import setting from "./../assets/img/setting.svg";
export default {
  name: "Navbar",
  data: () => {
    return {
      selectedItem: 1,
      userOptions: [
        {
          id: 1,
          icon: home,
          name: "homepage",
          title: "首頁",
        },
        {
          id: 2,
          icon: user,
          name: "user-info",
          title: "個人首頁",
        },
        {
          id: 3,
          icon: setting,
          name: "setting",
          title: "設定",
        },
      ],
      adminOptons: [
        {
          id: 1,
          icon: "../assets/img/home.svg",
          name: "tweets-list",
          title: "推文清單",
        },
        {
          id: 2,
          icon: "../assets/img/user.svg",
          name: "users-list",
          title: "使用者列表",
        },
      ],
    };
  },
};
</script>
