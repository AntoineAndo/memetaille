<template>
  <h1 v-bind:attribut="dataAttr">{{title}}</h1>
  {{test}}
  <button v-on:click="changeTitle">Change title</button>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      title: 'Login 1',
      test: 'DATA TEST',
      dataAttr: 'test attr',
    };
  },
  methods: {
    changeTitle() {
      this.title = 'Login 2';
    },
  },
};
</script>
