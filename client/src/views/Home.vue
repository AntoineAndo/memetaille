<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

    <div>
      <p v-if="isConnected">We're connected to the server!</p>
      <p>Message from server: "{{socketMessage}}"</p>
      <button @click="pingServer()">Ping Server</button>
    </div>
    <HelloWorld msg="TEST to Your Vue.js App"/>
  </div>
</template>

<script>

export default {
  name: 'Home',
};
</script>
