import router from './router';
import store from './store';
import { getCurrentUser, getToken } from './utils/auth.js';

const whiteList = ['/login', '/403', '/404'];

router.beforeEach(async (to, from, next) => {
  const hasToken = getToken();
  //hastoken
  if (true) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      const currentUser = getCurrentUser();
      // const adminRole = currentUser.roles.find((item) => {
      //   return item.name === 'ROLE_ADMIN';
      // });
      if (true) {
        next();
      } else {
        await store.dispatch('user/logout');
        this.$message.error('你无权限访问后台');
        next(`/login?redirect=${to.path}`);
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});
