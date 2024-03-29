<template>
  <v-form
    tile
    elevation="0"
    max-width="540px"
    class="mx-auto mt-0"
    @submit.stop.prevent="handleSubmit()"
  >
    <v-card-text>
      <v-text-field
        label="帳號"
        v-model="account"
        name="account"
        :rules="[rules.required]"
        autofocus
        filled
        dense
      ></v-text-field>
      <v-text-field
        label="密碼"
        v-model="password"
        name="password"
        :rules="[rules.required, rules.min]"
        counter
        filled
        dense
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="show = !show"
        :type="show ? 'text' : 'password'"
      ></v-text-field>
    </v-card-text>
    <v-card-actions class="button-section">
      <v-btn
        block
        depressed
        rounded
        color="primary"
        dark
        type="submit"
        :loading="loading"
        class="button-signin"
        >登入
      </v-btn>
    </v-card-actions>
  </v-form>
</template>
<script>
import authorizationAPI from "../apis/authorization";
import { Toast } from "./../utils/helpers";
export default {
  name: "SignInForm",
  props: {
    inIsAdminSignPage: {
      type: Boolean,
      default: () => false,
    },
  },

  data() {
    return {
      account: "",
      password: "",
      show: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 5 || "Min 5 characters",
      },
      loading: false,
      isProcessing: false,
      isAdminSignPage: this.inIsAdminSignPage,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.account || !this.password) {
          Toast.fire({
            icon: "warning",
            title: "請填入帳號和密碼",
          });
          return;
        }
        this.loading = true;
        const response = await authorizationAPI.signIn({
          account: this.account,
          password: this.password,
        });
        const { data } = response;

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        if (this.isAdminSignPage === true) {
          if (data.user.role !== "admin") {
            Toast.fire({
              icon: "warning",
              title: "一般使用者不可登入!",
            });
            this.loading = false;
            this.account = "";
            this.password = "";
            return;
          }
          localStorage.setItem("token", data.token);
          this.$store.commit("setCurrentUser", data.user);
          this.loading = false;
          this.$router.push("/dashboard");
          Toast.fire({
            icon: "success",
            title: `Hi ${data.user.name} 歡迎回來`,
          });

          return;
        } else {
          if (data.user.role !== "user") {
            Toast.fire({
              icon: "warning",
              title: "管理員不可登入!",
            });
            this.loading = false;
            this.account = "";
            this.password = "";
            return;
          }
          localStorage.setItem("token", data.token);
          this.$store.commit("setCurrentUser", data.user);
          this.$router.push("/tweets");
          Toast.fire({
            icon: "success",
            title: `Hi ${data.user.name} 歡迎回來`,
          });
        }
      } catch (error) {
        this.loading = false;
        this.password = "";
        Toast.fire({
          icon: "warning",
          title: "帳號或密碼有誤",
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.button-section {
  position: relative;
  .button-signin {
    font-weight: 500;
    font-size: 18px;
    line-height: 26px;
  }
}
</style>
