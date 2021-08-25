<template>
  <v-card
    height="100vh"
    elevation="0"
    width="210px"
    class="nav-list d-flex align-start flex-column pa-2 mx-auto"
    ><Spinner v-if="isLoading" />
    <template v-else>
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
            class="mt-5 pr-3 option-item"
            :to="option.path"
          >
            <v-list-item-icon class="ml-2 pr-0 nav-icon">
              <v-icon class="option-icon">{{ option.icon }}</v-icon>
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
    </template>
    <!-- logout -->
    <div>
      <v-list flat rounded nav class="p-0">
        <v-list-item class="pl-0">
          <v-btn text rounded @click="logout" x-large class="pl-0">
            <v-list-item-icon class="ml-2 pr-0">
              <v-img
                src="../assets/img/logout.svg"
                width="1.5rem"
                height="1.5rem"
                class="ml-2"
              ></v-img>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="nav-title">登出</v-list-item-title>
            </v-list-item-content>
          </v-btn>
        </v-list-item>
      </v-list>
    </div>
    <!-- logout -->
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import tweetsAPI from "../apis/tweets";
import { Toast } from "./../utils/helpers";
import Spinner from "./Spinner.vue";
export default {
  name: "Navbar",
  components: {
    Spinner,
  },
  data() {
    return {
      dialog: false,
      model: 1,
      rules: [(v) => v.length <= 150 || "Max 150 characters"],
      userId: -1,
      isProcessing: false,
      text: "",
      options: [],
      isLoading: false,
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

        const tweet = {
          createdAt: new Date(),
          description: this.text,
        };
        this.$emit("after-post-tweet", tweet);
        this.text = "";
        this.isProcessing = false;
        this.dialog = false;

        Toast.fire({
          icon: "success",
          title: "新增推文成功",
        });
      } catch (error) {
        this.text = "";
        this.isProcessing = false;
        Toast.fire({ icon: "error", title: "無法新增推文，請稍後再試" });
      }
    },
    fetchCurrentUser(newVal) {
      this.isLoading = true;
      const { id } = newVal;
      this.userId = id;
      if (this.currentUser.role !== "admin") {
        this.options = [
          {
            id: 1,
            icon: "mdi-home",
            title: "首頁",
            path: "/tweets",
            name: "tweets",
          },
          {
            id: 2,
            icon: "mdi-account-outline",
            title: "個人資料",
            path: { name: "users", params: { id: this.userId } },
            name: "users",
          },
          {
            id: 3,
            icon: "mdi-cog-outline ",
            title: "設定",
            path: "/setting",
            name: "setting",
          },
        ];
      } else {
        this.options = [
          {
            id: 1,
            icon: "mdi-home",
            title: "推文清單",
            path: "/dashboard/tweets",
            name: "adminTweets",
          },
          {
            id: 2,
            icon: "mdi-account-outline",
            title: "使用者列表",
            path: "/dashboard/users",
            name: "adminUsers",
          },
        ];
      }
      this.isLoading = false;
    },
  },
  created() {
    this.fetchCurrentUser(this.currentUser);
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
};
</script>
<style lang="scss" scpoed>
@import "./../assets/scss/components/_Navbar.scss";
.option-icon {
  color: red;
}
</style>
