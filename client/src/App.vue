<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link v-if="isConnected == false" to="/login">Login</router-link> |
    <router-link v-if="isConnected" :to="'/users/'+userID">Profile</router-link>
  </div>
  <router-view/>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      userID: '',
    };
  },
  methods: {
    _isConnected() {
      const localData = JSON.parse(localStorage.getItem('user'));
      if (localData == null || !localData.user) {
        this.userID = null;
        return false;
      }
      this.userID = localData.user._id;
      return true;
    },
  },
  computed: {
    isConnected() {
      return this._isConnected();
    },
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
