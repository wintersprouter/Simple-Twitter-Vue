<template>
  <v-card
    height="100vh"
    elevation="0"
    width="210px"
    justify="space-between"
    class="nav-list flex-column"
  >
    <v-list flat rounded nav>
      <!-- user -->
      <v-list-item-group v-model="selectedItem" color="primary">
        <!-- logo -->
        <router-link to="/">
          <v-btn
            icon
            color="primary"
            rounded
            class="ml-1"
            width="70px"
            height="45px"
          >
            <v-img
              src="../assets/img/logo.svg"
              max-width="40px"
              max-height="40px"
            ></v-img>
          </v-btn>
        </router-link>
        <!-- logo-end -->
        <v-list-item
          v-for="userOption in userOptions"
          :key="userOption.id"
          link
          class="mt-5 pr-5"
        >
          <v-list-item-icon class="ml-3">
            <v-img :src="userOption.icon" :alt="userOption.name"></v-img>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              v-text="userOption.title"
              class="font-weight-bold text-left"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="mt-3">
          <v-dialog v-model="dialog" max-width="600px" max-hight="300px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                block
                rounded
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                elevation="0"
              >
                推文
              </v-btn>
            </template>
            <v-card elevation="0" style="border-radius: 14px">
              <v-card-actions>
                <v-btn color="primary" text @click="dialog = false"
                  ><span>&#10005;</span>
                </v-btn>
              </v-card-actions>
              <v-divider></v-divider>
              <v-card-actions>
                <v-container class="d-flex justify-space-between">
                  <v-avatar size="50" class="mr-5">
                    <img
                      src="https://cdn.vuetifyjs.com/images/john.jpg"
                      alt="MasterCard"
                    />
                  </v-avatar>

                  <v-textarea
                    :rules="rules"
                    :value="value"
                    counter="150"
                    auto-grow
                    autofocus
                    row-height="15"
                    placeholder="有什麼新鮮事？"
                  ></v-textarea>
                </v-container>
              </v-card-actions>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  rounded
                  elevation="0"
                  @click="dialog = false"
                  mb-5
                >
                  推文
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list-item>
      </v-list-item-group>
      <!-- user-end -->
      <!-- admin -->
      <v-list-item-group v-model="selectedItem" color="primary">
        <!-- logo -->
        <router-link to="/">
          <v-btn
            icon
            color="primary"
            rounded
            class="ml-1"
            width="70px"
            height="45px"
          >
            <v-img
              src="../assets/img/logo.svg"
              max-width="40px"
              max-height="40px"
            ></v-img>
          </v-btn>
        </router-link>
        <!-- logo-end -->
        <v-list-item
          v-for="adminOption in adminOptions"
          :key="adminOption.id"
          link
          class="mt-5 pr-5"
        >
          <v-list-item-icon class="ml-3">
            <v-img :src="adminOption.icon" :alt="adminOption.name"></v-img>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              v-text="adminOption.title"
              class="font-weight-bold text-left"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <!-- admin-end -->
    </v-list>
    <!-- logout -->
    <v-list flat rounded nav>
      <v-list-item-group v-model="selectedItem" color="primary">
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
      </v-list-item-group>
    </v-list>
    <!-- logout -->
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
      dialog: false,
      rules: [(v) => v.length <= 150 || "Max 150 characters"],
      value: "",
      selectedItem: 1,
      userOptions: [
        {
          id: 1,
          icon: home,
          title: "首頁",
        },
        {
          id: 2,
          icon: user,
          title: "個人首頁",
        },
        {
          id: 3,
          icon: setting,
          title: "設定",
        },
      ],
      adminOptions: [
        {
          id: 1,
          icon: home,
          title: "推文清單",
        },
        {
          id: 2,
          icon: user,
          title: "使用者列表",
        },
      ],
    };
  },
};
</script>
<style lang="scss">
.nav-list {
  display: flex;
  float: right;
  margin: 0 auto;
}
</style>
