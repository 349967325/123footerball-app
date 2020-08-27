// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';

import bespeak from './components/bespeak';
import member from './components/member';


Vue.use(VueRouter);
Vue.use(VueResource);

Vue.config.productionTip = false

/* eslint-disable no-new */
/* 配置路由 */
const routes = [
  { path: "/", component: bespeak },
  { path: "/bespeak", component: bespeak },
  { path: "/member", component: member }
];

/* 创建router实例，传入路由配置 */
const router = new VueRouter({
	routes
});

/* 挂载根实例，启动路由 */
const app = new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

