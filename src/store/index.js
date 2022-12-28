import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user.js';
import { setCurrentUser, setToken } from '../utils/auth.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {
    SET_TOKEN(token) {
      setToken(token);
    },
    SET_CURRENT_USER(currenUser) {
      setCurrentUser(currenUser);
    },
  },
  actions: {},
  modules: {
    user,
  },
});
