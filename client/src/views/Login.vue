<template>
  <h1 v-bind:attribut="dataAttr">{{title}}</h1>
  {{test}}

  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="username">Username</label>
      <input v-model="formUsername" type="text" name="username">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input v-model="formPassword" v-bind:type="formPasswordFieldType" name="password">
      <button v-on:click="togglePasswordVisibility">{{labelPasswordVisibility}}</button>
    </div>
    <div class="form-group">
      <button class="btn btn-prmimary">Login</button>
    </div>
  </form>

  <router-link
    to="/register">
      <NavLink>
       Register
      </NavLink>
    </router-link>
</template>
<script>

import { useStore } from 'vuex';

export default {
  name: 'Login',
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
  data() {
    return {
      title: 'Login 1',
      submitted: false,
      dataAttr: 'test attr',
      formUsername: '',
      formPassword: '',
      formPasswordFieldType: 'password',
      labelPasswordVisibility: 'Afficher mot de passe',
    };
  },
  methods: {
    togglePasswordVisibility() {
      if (this.formPasswordFieldType === 'password') {
        this.labelPasswordVisibility = 'Masquer mot de passe';
        this.formPasswordFieldType = 'text';
      } else {
        this.labelPasswordVisibility = 'Afficher mot de passe';
        this.formPasswordFieldType = 'password';
      }
    },
    handleSubmit(e) {
      this.submitted = true;
      const { formUsername, formPassword } = this;
      if (formUsername && formPassword) {
        this.store.dispatch('login', { user: this.formUsername, password: this.formPassword });
      }
    },
  },
  computed: {
    test() { return this.store.state.testStore; },
  },
};
</script>
