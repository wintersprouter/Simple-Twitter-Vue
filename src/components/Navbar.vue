<template>
  <v-card
    height="100vh"
    elevation="0"
    width="210px"
    class="nav-list d-flex align-start flex-column pa-2 mx-auto"
  >
    <div>
      <v-list rounded nav>
        <!-- user -->
        <v-list-item-group v-model="model" color="primary">
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
            v-for="option in options"
            :key="option.id"
            class="mt-5 pr-5"
            :to="option.path"
          >
            <v-list-item-icon class="ml-3 nav-icon">
              <v-img
                :class="option.name"
                :src="option.icon"
                max-width="2rem"
                max-height="2rem"
              ></v-img>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="nav-title">{{
                option.title
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="mt-5" v-if="currentUser.role === 'user'">
            <v-dialog v-model="dialog" max-width="600px" max-hight="300px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  rounded
                  block
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  depressed
                  x-large
                  class="nav-button"
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
                <v-form @submit.stop.prevent="handleSubmit">
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
                        v-model="text"
                        :rules="rules"
                        counter
                        maxlength="140"
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
                      depressed
                      type="submit"
                      class="mb-5"
                      :disabled="isProcessing"
                    >
                      推文
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-dialog>
          </v-list-item>
        </v-list-item-group>
        <!-- user-end -->
      </v-list>
    </div>
    <!-- logout -->
    <div>
      <v-list flat rounded nav>
        <v-list-item>
          <v-btn text rounded @click="logout" x-large>
            <v-list-item-icon>
              <v-img
                src="../assets/img/logout.svg"
                width="2rem"
                height="2rem"
                class="ml-2"
              ></v-img>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="nav-title"> 登出</v-list-item-title>
            </v-list-item-content>
          </v-btn>
        </v-list-item>
      </v-list>
    </div>
    <!-- logout -->
  </v-card>
</template>
<script>
import home from "./../assets/img/home.svg";
import atHome from "./../assets/img/at_home.svg";
import user from "./../assets/img/user.svg";
import atUser from "./../assets/img/at_user.svg";
import setting from "./../assets/img/setting.svg";
import atSetting from "./../assets/img/at_setting.svg";
import { mapState } from "vuex";
import tweetsAPI from "../apis/tweets";
import { Toast } from "./../utils/helpers";
export default {
  name: "Navbar",
  data: () => {
    return {
      dialog: false,
      model: 1,
      rules: [(v) => v.length <= 150 || "Max 150 characters"],
      userId: -1,
      isProcessing: false,
      text: "",
      options: [],
    };
  },
  methods: {
    logout() {
      this.$store.commit("revokeAuthentication");
      this.$router.push("/signin");
    },
    async handleSubmit() {
      try {
        if (!this.text) {
          Toast.fire({ icon: "warning", title: "您尚未填寫任何內容" });
          return;
        }
        if (this.text.trim().length > 140) {
          Toast.fire({ icon: "warning", title: "推文內容不得超過 140 字" });
          return;
        }
        this.isProcessing = true;

        const { data } = await tweetsAPI.postTweet({
          description: this.text,
        });
        console.log(data);
        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.text = "";
        this.isProcessing = false;
        this.dialog = false;

        Toast.fire({
          icon: "success",
          title: "新增推文成功",
        });
        this.$router.push("/tweets");
      } catch (error) {
        this.text = "";
        this.isProcessing = false;
        Toast.fire({ icon: "error", title: "無法新增推文，請稍後再試" });
      }
    },
    fetchCurrentUser(newVal) {
      const { id } = newVal;
      this.userId = id;
      if (this.currentUser.role !== "admin") {
        this.options = [
          {
            id: 1,
            icon: home,
            title: "首頁",
            path: "/tweets",
            name: "tweets",
          },
          {
            id: 2,
            icon: user,
            title: "個人首頁",
            path: { name: "users", params: { id: this.userId } },
            name: "users",
          },
          {
            id: 3,
            icon: setting,
            title: "設定",
            path: "/setting",
            name: "setting",
          },
        ];
      } else {
        this.options = [
          {
            id: 1,
            icon: home,
            title: "推文清單",
            path: "/admin/tweets",
            name: "adminTweets",
          },
          {
            id: 2,
            icon: user,
            title: "使用者列表",
            path: "/admin/users",
            name: "adminUsers",
          },
        ];
      }
    },
    activeIcon(name) {
      const optionName = [
        "tweets",
        "users",
        "setting",
        "adminTweets",
        "adminUsers",
      ];
      const activeIcons = [atHome, atUser, atSetting, atHome, atUser];
      for (let i = 0; i <= optionName.length; i++) {
        if (name === optionName[i]) {
          this.options.map((option) => {
            if (option.name === optionName[i]) {
              option.icon = activeIcons[i];
              return;
            }
            return;
          });
        }
      }
    },
  },
  created() {
    this.fetchCurrentUser(this.currentUser);
    const { name } = this.$route;
    this.activeIcon(name);
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
};
</script>
<style lang="scss">
@import "./../assets/scss/components/_Navbar.scss";
</style>
