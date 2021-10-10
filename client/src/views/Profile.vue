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
      console.log(this.$route.params.id);
      if (err) {
        this.error = err.toString();
        console.log(err);
      } else {
        this.user = user;
      }
    },
  },
};
</script>
