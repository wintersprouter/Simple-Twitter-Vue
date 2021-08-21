<template>
  <v-card tile elevation="0" max-width="540px" ref="form">
    <v-card-text>
      <v-text-field
        label="帳號"
        v-model="account"
        maxlength="20"
        counter
        filled
        dense
        required
        :rules="[rules.required]"
      ></v-text-field>
      <v-text-field
        label="名稱"
        v-model="name"
        maxlength="50"
        counter
        filled
        dense
        required
        :rules="[rules.required]"
      ></v-text-field>
      <v-text-field
        label="Email"
        v-model="email"
        maxlength="20"
        counter
        filled
        dense
        required
        :rules="[rules.required]"
      ></v-text-field>
      <v-text-field
        label="密碼"
        v-model="password"
        required
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.minPassword]"
        :type="show ? 'text' : 'password'"
        counter
        maxlength="15"
        @click:append="show = !show"
        filled
        dense
      ></v-text-field>
      <v-text-field
        label="密碼確認"
        required
        v-model="checkPassword"
        :append-icon="checkShow ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.minPassword]"
        :type="checkShow ? 'text' : 'password'"
        counter
        maxlength="15"
        @click:append="checkShow = !checkShow"
        filled
        dense
      ></v-text-field>
    </v-card-text>
    <v-card-actions class="button-section">
      <!-- <v-btn block rounded color="primary" dark @click="submit" elevation="0"
        >註冊</v-btn
      > -->
      <v-btn
        rounded
        color="primary"
        dark
        @click="submit"
        elevation="0"
        class="button-save"
        >儲存</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "UserForm",
  props: {
    initialCurrentUser: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      account: this.initialCurrentUser.account,
      name: this.initialCurrentUser.name,
      email: this.initialCurrentUser.email,
      password: "",
      checkPassword: "",
      show: false,
      checkShow: false,
      rules: {
        required: (value) => !!value || "Required.",
        minPassword: (v) => v.length > 5 || "Min 5 characters",
      },
    };
  },
  methods: {},
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
};
</script>
<style lang="scss">
.button-section {
  position: relative;
  .button-save {
    position: absolute;
    right: 16px;
  }
}
</style>
