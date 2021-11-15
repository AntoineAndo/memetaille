import { createStore } from 'vuex';
import { userService } from '../_services/user.service';

export default createStore({
  state: {
    loginAttempts: 0,
    registerAttempts: 0,
  },
  mutations: {
    loginAttempt(state) {
      state.loginAttempts += 1;
    },
    registerAttempts(state) {
      state.registerAttempts += 1;
    },
  },
  actions: {
    login(context, payload) {
      context.commit('loginAttempt');
      userService.login(payload.email, payload.password, payload.cb);
    },
    register(context, payload) {
      context.commit('registerAttempts');

      // Payload properties spread
      userService.register(...Object.values(payload), payload.cb);
    },
  },
});
