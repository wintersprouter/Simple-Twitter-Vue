<template>
  <v-card
    height="100vh"
    elevation="0"
    width="210px"
    class="nav-list d-flex align-start flex-column pa-2 mb-auto"
  >
    <div>
      <v-list flat rounded nav>
        <!-- user -->
        <v-list-item-group color="primary">
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
                class="avatar-image"
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
            <router-link
              :to="userOption.path"
              class="nav-link font-weight-bold text-left"
            >
              <v-list-item class="nav-option">
                <v-list-item-icon class="ml-3 nav-icon">
                  <v-img :src="userOption.icon" :alt="userOption.name"></v-img>
                </v-list-item-icon>
                <v-list-item-title>
                  {{ userOption.title }}
                </v-list-item-title>
              </v-list-item>
            </router-link>
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
                  depressed
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
                        :src="currentUser.avatar"
                        :alt="currentUser.name"
                        class="image"
                      />
                    </v-avatar>

                    <v-textarea
                      :rules="rules"
                      :value="value"
                      counter
                      maxlength="150"
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
        <v-list-item-group v-if="currentUser.role === 'admin'" color="primary">
          <!-- logo -->
          <router-link to="/admin/tweets">
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
            <router-link
              :to="adminOption.path"
              class="nav-link font-weight-bold text-left"
            >
              <v-list-item>
                <v-list-item-icon class="ml-3 nav-icon">
                  <v-img
                    :src="adminOption.icon"
                    :alt="adminOption.name"
                  ></v-img>
                </v-list-item-icon>
                <v-list-item-title>
                  {{ adminOption.title }}
                </v-list-item-title>
              </v-list-item>
            </router-link>
          </v-list-item>
        </v-list-item-group>
        <!-- admin-end -->
      </v-list>
    </div>
    <!-- logout -->
    <div>
      <v-list flat rounded nav>
        <v-list-item>
          <v-list-item-icon class="mx-4">
            <v-btn text rounded class="ml-1" @click="logout">
              <v-img src="../assets/img/logout.svg" max-width="20"></v-img>
              登出
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </div>
    <!-- logout -->
  </v-card>
</template>
<script>
import home from "./../assets/img/home.svg";
import user from "./../assets/img/user.svg";
import setting from "./../assets/img/setting.svg";
import { mapState } from "vuex";
export default {
  name: "Navbar",
  data: () => {
    return {
      dialog: false,
      rules: [(v) => v.length <= 150 || "Max 150 characters"],
      value: "",
      userOptions: [
        {
          id: 1,
          icon: home,
          title: "首頁",
          path: "/",
        },
        {
          id: 2,
          icon: user,
          title: "個人首頁",
          path: { name: "users", params: { id: 1 } },
        },
        {
          id: 3,
          icon: setting,
          title: "設定",
          path: "/setting",
        },
      ],
      adminOptions: [
        {
          id: 1,
          icon: home,
          title: "推文清單",
          path: "/admin/tweets",
        },
        {
          id: 2,
          icon: user,
          title: "使用者列表",
          path: "/admin/users",
        },
      ],
    };
  },
  methods: {
    logout() {
      this.$store.commit("revokeAuthentication");
      this.$router.push("/signin");
    },
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
};
</script>
<style lang="scss">
@import "./../assets/scss/components/_Navbar.scss";
</style>
