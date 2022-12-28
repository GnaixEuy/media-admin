import {
  getCurrentUser,
  getToken,
  removeCurrentUser,
  removeToken,
  setCurrentUser,
  setToken,
} from '../../utils/auth.js';
import { createToken } from '../../api/token';
import user from '../../api/user';

const state = () => ({
  token: getToken(),
  currentUser: getCurrentUser(),
});

const getters = {
  nickname: (state) => {
    return state.currentUser && state.currentUser.nickname
      ? state.currentUser.nickname
      : '';
  },
  user: (state) => {
    return state.currentUser ? state.currentUser : null;
  },
};

const actions = {
  login({ commit }, { username, password }) {
    return new Promise((resolve, reject) => {
      createToken(username.trim(), password)
        .then((token) => {
          commit('SET_TOKEN', token.data.token);
          setToken(token.data.token);
          resolve();
        })
        .catch((error) => {
          reject(error);
          alert('登录失败，请检查账号密码是否错误');
        });
    });
  },
  logout({ commit }) {
    commit('SET_TOKEN', '');
    commit('SET_CURRENT_USER', null);
    removeToken();
    removeCurrentUser();
  },
  fetchCurrentUser({ commit }) {
    return new Promise((resolve, reject) => {
      user
        .me()
        .then((currenUser) => {
          commit('SET_CURRENT_USER', currenUser.data);
          setCurrentUser(currenUser.data);
          resolve(currenUser.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_CURRENT_USER: (state, currentUser) => {
    state.currentUser = currentUser;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
