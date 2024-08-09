import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import VueAxios from 'vue-axios'
import Axios from 'axios'
import api from './config/api'


import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

// import '@/icons' // icon
// import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.use(VueAxios, Axios);
// 添加响应拦截器
Axios.interceptors.response.use(
  function (response) {
    // 对响应数据做些事
    return response;
  },
  function (error) {
    // 对响应错误做些事
    if (error.response.status === 401) {
      // 重定向登录页面
      window.location.href = "/login#/login";
    }
  }
);
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {

  let token = localStorage.getItem('token') || '';

  //配置接口信息
  // Axios.defaults.baseURL = 'http://www.地址.com:8360/admin/';
  Axios.defaults.baseURL = api.rootUrl;
  Axios.defaults.headers.common['Authorization'] = "Bearer " + token;

  if (!token && to.name !== 'login') {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
