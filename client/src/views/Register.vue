<template>
  <h1>{{pageName}}</h1>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="username">Username</label>
      <input v-model="formUsername" type="text" name="username">
    </div>
    <div class="form-group">
      <label for="email">Email address</label>
      <input v-model="formEmail" type="text" name="email">
    </div>
    <div class="form-group">
      <label for="height">height</label>
      <input v-model="formHeight" type="number" min="100" max="200" name="height">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input v-model="formPassword" v-bind:type="formPasswordFieldType" name="password">
    </div>
    <div class="form-group">
      <button class="btn btn-prmimary">Register</button>
    </div>
  </form>

</template>

<script>
import { useStore } from 'vuex';

export default {
  name: 'Register',
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
  data() {
    return {
      pageName: 'Register',
      formUsername: '',
      formPassword: '',
      formEmail: '',
      formHeight: '',
    };
  },
  methods: {
    handleSubmit(e) {
      this.submitted = true;
      const {
        formUsername,
        formPassword,
        formEmail,
        formHeight,
      } = this;
      if (formEmail && formPassword && formUsername && formHeight) {
        this.store.dispatch('register', {
          formEmail,
          formPassword,
          formUsername,
          formHeight,
        });
      }
    },
  },
};

</script>
