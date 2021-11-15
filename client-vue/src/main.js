import { createApp } from 'vue';
import store from './_store/store';

// import VueSocketIO from 'vue-socket.io';

import App from './App.vue';
import router from './router';

import initFacebookSdk from './_helpers/init-facebook-sdk';

initFacebookSdk().then(() => {
  const vueApp = createApp(App);

  vueApp.use(router);
  vueApp.use(store);
  vueApp.mount('#app');
});
