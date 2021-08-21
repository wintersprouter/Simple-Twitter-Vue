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
        :error-messages="accountErrors"
        @input="$v.account.$touch()"
        @blur="$v.account.$touch()"
      ></v-text-field>
      <v-text-field
        label="名稱"
        v-model="name"
        maxlength="20"
        counter
        filled
        dense
        required
        :error-messages="nameErrors"
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      ></v-text-field>
      <v-text-field
        label="Email"
        v-model="email"
        maxlength="20"
        counter
        filled
        dense
        required
        :error-messages="emailErrors"
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      ></v-text-field>
      <v-text-field
        label="密碼"
        v-model="password"
        required
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        counter
        maxlength="15"
        @click:append="show = !show"
        filled
        dense
        :error-messages="passwordErrors"
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
      ></v-text-field>
      <v-text-field
        label="密碼確認"
        required
        v-model="checkPassword"
        :append-icon="checkShow ? 'mdi-eye' : 'mdi-eye-off'"
        :type="checkShow ? 'text' : 'password'"
        counter
        maxlength="15"
        @click:append="checkShow = !checkShow"
        filled
        dense
        :error-messages="checkPasswordErrors"
        @input="$v.checkPassword.$touch()"
        @blur="$v.checkPassword.$touch()"
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
import {
  required,
  maxLength,
  email,
  minLength,
} from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
export default {
  name: "UserForm",
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(20) },
    email: { required, email, maxLength: maxLength(20) },
    account: { required, maxLength: maxLength(20) },
    password: { required, maxLength: maxLength(15), minLength: minLength(5) },
    checkPassword: {
      required,
      maxLength: maxLength(15),
      minLength: minLength(5),
    },
  },
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
    };
  },
  methods: {},
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 20 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.maxLength &&
        errors.push("E-mail must be at most 20 characters long");
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    accountErrors() {
      const errors = [];
      if (!this.$v.account.$dirty) return errors;
      !this.$v.account.maxLength &&
        errors.push("Account must be at most 20 characters long");
      !this.$v.account.required && errors.push("Account is required.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.maxLength &&
        errors.push("Password must be at most 15 characters long");
      !this.$v.password.minLength &&
        errors.push("Password must be at least 5 characters long");
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    },
    checkPasswordErrors() {
      const errors = [];
      if (!this.$v.checkPassword.$dirty) return errors;
      !this.$v.checkPassword.maxLength &&
        errors.push("CheckPassword must be at most 15 characters long");
      !this.$v.checkPassword.minLength &&
        errors.push("CheckPassword must be at least 5 characters long");
      !this.$v.checkPassword.required &&
        errors.push("CheckPassword is required.");
      return errors;
    },
    methods: {
      submit() {
        this.$v.$touch();
      },
    },
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
