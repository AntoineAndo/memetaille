<template>
  <div class="about">
    <h1>Profile</h1>
    <h2>{{$route.params.id}}</h2>
    <div v-if="user">
      <p>Email address: {{user.email}}</p>
      <p>Username: {{user.username}}</p>
      <p>Height: {{user.height}}</p>
    </div>
  </div>
  <a href="#" class="item" @click="logout">Logout</a>
</template>

<script>
import { userService } from '../_services/user.service';

export default {
  name: 'Profile',
  data() {
    return {
      test: 'test',
      user: null,
      error: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    const localData = JSON.parse(localStorage.getItem('user'));

    // If no user is found in the local data
    if (localData == null) {
      next(vm => vm.setData('User not connected', null));
    }

    // If a user is found in the local data
    userService.getUser(to.params.id, localData.token, (err, data) => {
      if (err) {
        console.log('ERROR');
        console.log(err);
      }
      next(vm => vm.setData(err, data));
    });
  },
  beforeRouteUpdate(to, from, next) {
    const localData = JSON.parse(localStorage.getItem('user'));
    if (localData == null) {
      this.setData('User not connected', null);
      return;
    }
    this.post = null;
    userService.getUser(to.params.id, localData.token, (err, data) => {
      if (err) {
        console.log('ERROR');
        console.log(err);
      }
      this.setData(err, data);
      next();
    });
  },
  methods: {
    setData(err, user) {
      if (err) {
        this.error = err.toString();
      } else {
        this.user = user;
      }
    },
    logout() {
      console.log('LOGOUT');
      userService.logout();
      this.$router.push('/login');
    },
  },
};
</script>
