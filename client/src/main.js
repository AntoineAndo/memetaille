import { createApp } from 'vue';

// import VueSocketIO from 'vue-socket.io';

import App from './App.vue';
import router from './router';

const vueApp = createApp(App);

vueApp.use(router);
/*
vueApp.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3000',
}));
*/
vueApp.mount('#app');
