<template>
  <v-form
    tile
    elevation="0"
    max-width="540px"
    @submit.stop.prevent="handleSaving($event)"
  >
    <v-card-text>
      <v-text-field
        label="帳號"
        v-model="form.account"
        name="account"
        maxlength="20"
        counter
        filled
        dense
        required
        :autofocus="isSignUp"
        :error-messages="accountErrors"
        @input="$v.form.account.$touch()"
        @blur="$v.form.account.$touch()"
      ></v-text-field>
      <v-text-field
        label="名稱"
        v-model="form.name"
        name="name"
        maxlength="20"
        counter
        filled
        dense
        required
        :error-messages="nameErrors"
        @input="$v.form.name.$touch()"
        @blur="$v.form.name.$touch()"
      ></v-text-field>
      <v-text-field
        label="Email"
        v-model="form.email"
        name="email"
        maxlength="50"
        filled
        dense
        required
        :error-messages="emailErrors"
        @input="$v.form.email.$touch()"
        @blur="$v.form.email.$touch()"
      ></v-text-field>
      <v-text-field
        label="密碼"
        v-model="form.password"
        name="password"
        email
        required
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        counter
        maxlength="15"
        @click:append="show = !show"
        filled
        dense
        :error-messages="passwordErrors"
        @input="$v.form.password.$touch()"
        @blur="$v.form.password.$touch()"
      ></v-text-field>
      <v-text-field
        label="密碼確認"
        required
        v-model="form.checkPassword"
        name="checkPassword"
        :append-icon="checkShow ? 'mdi-eye' : 'mdi-eye-off'"
        :type="checkShow ? 'text' : 'password'"
        counter
        maxlength="15"
        @click:append="checkShow = !checkShow"
        filled
        dense
        :error-messages="checkPasswordErrors"
        @input="$v.form.checkPassword.$touch()"
        @blur="$v.form.checkPassword.$touch()"
      ></v-text-field>
    </v-card-text>
    <v-card-actions class="button-section">
      <template v-if="isSignUp">
        <v-btn
          block
          rounded
          color="primary"
          dark
          @click="submit()"
          depressed
          class="button-signup"
          type="submit"
          >註冊</v-btn
        ></template
      >
      <template v-else>
        <v-btn
          v-if="!isSaved"
          rounded
          color="primary"
          dark
          @click="submit()"
          type="submit"
          depressed
          :loading="isloading"
          class="button-save"
          >儲存</v-btn
        ><v-btn
          v-else
          rounded
          color="primary"
          dark
          depressed
          class="button-save"
          >已儲存</v-btn
        >
      </template>
    </v-card-actions>
  </v-form>
</template>
<script>
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  email,
  minLength,
} from "vuelidate/lib/validators";
import { mapState } from "vuex";
import { Toast } from "./../utils/helpers";
import usersAPI from "./../apis/users";
export default {
  name: "UserForm",
  mixins: [validationMixin],
  validations: {
    form: {
      name: { required, maxLength: maxLength(20) },
      email: { required, email },
      account: { required, maxLength: maxLength(20) },
      password: { required, maxLength: maxLength(15), minLength: minLength(5) },
      checkPassword: {
        required,
        maxLength: maxLength(15),
        minLength: minLength(5),
      },
    },
  },
  created() {
    this.fetchCurrentUser(this.currentUser);
  },

  data() {
    return {
      form: {
        name: "",
        account: "",
        email: "",
        password: "",
        checkPassword: "",
      },
      show: false,
      checkShow: false,
      isloading: false,
      isSaved: false,
      isSignUp: this.inIsSignUp,
    };
  },
  props: {
    inIsSignUp: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.form.name.$dirty) return errors;
      !this.$v.form.name.maxLength &&
        errors.push("Name must be at most 20 characters long");
      !this.$v.form.name.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.form.email.$dirty) return errors;
      !this.$v.form.email.email && errors.push("Must be valid e-mail");
      !this.$v.form.email.required && errors.push("E-mail is required");
      return errors;
    },
    accountErrors() {
      const errors = [];
      if (!this.$v.form.account.$dirty) return errors;
      !this.$v.form.account.maxLength &&
        errors.push("Account must be at most 20 characters long");
      !this.$v.form.account.required && errors.push("Account is required.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.form.password.$dirty) return errors;
      !this.$v.form.password.maxLength &&
        errors.push("Password must be at most 15 characters long");
      !this.$v.form.password.minLength &&
        errors.push("Password must be at least 5 characters long");
      !this.$v.form.password.required && errors.push("Password is required.");
      return errors;
    },
    checkPasswordErrors() {
      const errors = [];
      if (!this.$v.form.checkPassword.$dirty) return errors;
      !this.$v.form.checkPassword.maxLength &&
        errors.push("CheckPassword must be at most 15 characters long");
      !this.$v.form.checkPassword.minLength &&
        errors.push("CheckPassword must be at least 5 characters long");
      !this.$v.form.checkPassword.required &&
        errors.push("CheckPassword is required.");
      return errors;
    },
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  methods: {
    fetchCurrentUser(newVal) {
      const { name, email, account } = newVal;
      this.form = {
        ...this.form,
        name,
        email,
        account,
      };
    },
    submit() {
      this.$v.$touch();
    },

    async handleSaving() {
      try {
        const formData = {
          ...this.form,
        };
        const { name, account, email, password, checkPassword } = formData;
        if (!account || !name || !email || !password || !checkPassword) {
          Toast.fire({
            icon: "error",
            title: "All fields are required！",
          });
          this.form.password = "";
          this.form.checkPassword = "";
          return;
        }
        if (password !== checkPassword) {
          Toast.fire({
            icon: "error",
            title:
              "The password and confirmation do not match.Please retype them.",
          });
          this.form.password = "";
          this.form.checkPassword = "";
          return;
        }
        this.isloading = true;
        const userId = this.currentUser.id;
        const { data } = await usersAPI.users.updateAccount(userId, formData);

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        Toast.fire({ icon: "success", title: data.message });
        this.form.password = "";
        this.form.checkPassword = "";
        this.isloading = false;
        this.isSaved = true;
      } catch (error) {
        console.log(error.message);
        this.isloading = false;
        Toast.fire({
          icon: "error",
          title: error.response.data.message,
        });
      }
    },
  },
};
</script>
<style lang="scss">
@import "../assets/scss/components/_UserForm.scss";
</style>
