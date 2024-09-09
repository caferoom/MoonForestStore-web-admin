import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import VueAxios from 'vue-axios'
import Axios from 'axios'
import api from './common/api'


import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

Vue.use(ElementUI);

// Tips设置
Vue.config.productionTip = false;

// 配置axios
Vue.use(VueAxios, Axios);
Axios.defaults.baseURL = api.rootUrl;
Axios.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = "/login";
      } else {
        const data = error.response.data;
        const msg = `statusCode: ${data.statusCode} ${data.message.message}`;
        Vue.prototype.$message.error(msg);
      }
    } else {
      Vue.prototype.$message.error("网络错误，请检查您的网络并稍后重试");
    }

  }
);
Axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token') || '';
    config.headers["Authorization"] = 'Bearer ' + token;
    return config;
  }
);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
