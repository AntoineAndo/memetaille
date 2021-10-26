<template>
  <h1 v-bind:attribut="dataAttr">{{title}}</h1>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="email">Email</label>
      <input v-model="formEmail" type="text" name="email">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input v-model="formPassword" v-bind:type="formPasswordFieldType" name="password">
      <!-- <button v-on:click="togglePasswordVisibility">{{labelPasswordVisibility}}</button> -->
    </div>
    <div class="form-group">
      <button class="btn btn-prmimary">Login</button>
    </div>
  </form>
  <div class="card">
      <h4 class="card-header">-- OR -- </h4>
      <div class="card-body">
          <button class="btn btn-facebook" @click="fbLogin">
              <i class="fa fa-facebook mr-1"></i>
              Login with Facebook
          </button>
      </div>
  </div>
  <router-link
    to="/register">
      <NavLink>
       Register
      </NavLink>
    </router-link>
</template>
<script>

import { useStore } from 'vuex';
import { userService, fbService } from '../_services/index';

export default {
  name: 'Login',
  components: {
  },
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
      formEmail: '',
      formPassword: '',
      formPasswordFieldType: 'password',
      labelPasswordVisibility: 'Afficher mot de passe',
      FB: undefined,
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
      const { formEmail, formPassword } = this;
      if (formEmail && formPassword) {
        this.store.dispatch('login', { email: this.formEmail, password: this.formPassword, cb: this.cbSubmit });
      }
    },
    cbSubmit(user) {
      if (user == false) {
        // Handle user not found
        return;
      }
      this.$router.push('Profile');
    },
    getUserData() {
      this.FB.api('/me', 'GET', { fields: 'id,name,email,picture' },
        user => {
          console.log(user);
          this.personalID = user.id;
          this.email = user.email;
          this.name = user.name;
          this.picture = user.picture.data.url;
        });
    },
    fbLogin: fbService.login,
  },
  computed: {
    test() { return this.store.state.testStore; },
  },
};
</script>
