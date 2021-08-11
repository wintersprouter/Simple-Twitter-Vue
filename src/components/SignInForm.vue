<template>
  <v-card tile elevation="0" max-width="540px" class="mx-auto mt-15" ref="form">
    <v-text-field
      label="帳號"
      filled
      autofocus
      dense
      required
      v-model="form.account"
      :rules="[rules.required]"
    ></v-text-field>
    <v-text-field
      label="密碼"
      required
      v-model="form.password"
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.min]"
      :type="show ? 'text' : 'password'"
      counter
      @click:append="show = !show"
      filled
      dense
    ></v-text-field>
    <v-btn block rounded color="primary" dark @click="submit">登入 </v-btn>
  </v-card>
</template>
<script>
export default {
  name: "SignInForm",
  data() {
    const defaultForm = Object.freeze({
      account: "",
      password: "",
    });
    return {
      show: false,
      form: Object.assign({}, defaultForm),
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 5 || "Min 5 characters",
      },
    };
  },
  methods: {
    resetForm() {
      this.form = Object.assign({}, this.defaultForm);
      this.$refs.form.reset();
    },
    submit() {
      this.resetForm();
    },
  },
};
</script>
