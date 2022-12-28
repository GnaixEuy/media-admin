import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './permission';
import { Message } from 'element-ui';
import { Notification } from 'element-ui';

Vue.config.productionTip = false;

Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
