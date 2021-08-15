<template>
  <v-form
    tile
    elevation="0"
    max-width="540px"
    class="mx-auto mt-0"
    @submit.prevent="handleSubmit()"
  >
    <v-text-field
      label="帳號"
      filled
      autofocus
      dense
      required
      v-model="account"
      name="account"
      :rules="[rules.required]"
    ></v-text-field>
    <v-text-field
      label="密碼"
      v-model="password"
      name="password"
      counter
      filled
      dense
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="show = !show"
      :type="show ? 'text' : 'password'"
      :rules="[rules.required, rules.min]"
    ></v-text-field>
    <v-btn block elevation="0" rounded color="primary" dark type="submit"
      >登入
    </v-btn>
  </v-form>
</template>
<script>
import authorizationAPI from "../apis/authorization";
export default {
  name: "SignInForm",
  data() {
    return {
      account: " ",
      password: " ",
      show: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 5 || "Min 5 characters",
      },
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await authorizationAPI.signIn({
          account: this.account,
          password: this.password,
        });
        const { data } = response;

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        localStorage.setItem("token", data.token);

        this.$router.push("/");
      } catch {
        this.password = "";
      }
    },
  },
};
</script>
