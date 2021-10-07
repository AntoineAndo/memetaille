import { createStore } from 'vuex';
import { userService } from '../_services/user.service';

export default createStore({
  state: {
    testStore: 'initial store value',
  },
  mutations: {
    changeTestValue(state, value) {
      state.testStore = value;
    },
  },
  actions: {
    login(context, payload) {
      context.commit('changeTestValue', payload.value);
      console.log('User: ');
      console.log(payload);
      userService.login(payload.user, payload.password);
    },
  },
});
