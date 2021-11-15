<template>
  <div class="home">
    <div class="users">
      <div v-if="loadin">
        Loading
      </div>
      <ul v-if="loading == false">
        <li>test</li>
      </ul>
    </div>
  </div>
</template>

<script>

import { userService } from '../_services/user.service';

export default {
  name: 'Home',
  data() {
    return {
      test: 'test',
      user: null,
      error: null,
    };
  },
  watch: {
    // call again the method if the route changes
    $route: 'fetchData',
  },
  created() {
    console.log('this.$parent');
    console.log(this.$parent);
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchUsers();
    return {};
  },
  methods: {
    setData(err, user) {
      if (err) {
        this.error = err.toString();
      } else {
        this.user = user;
      }
    },
    fetchUsers() {
      console.log('FETCH USERS');
      // this.error = this.post = null
      this.loading = true;

      const localData = JSON.parse(localStorage.getItem('user'));
      if (localData == null || !localData.user) {
        this.setData('User not connected', null);
        return;
      }
      // replace `getPost` with your data fetching util / API wrapper
      userService.getUsers(localData, (err, post) => {
        console.log('post');
        console.log(post);
      });
    },
  },
};
</script>
