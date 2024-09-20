import { createApp } from 'vue';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'; // 引入 Element Plus 的样式
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/style.css' // global css

import App from './App'
import store from './store'
import router from './router'
import axios from 'axios';

const app = createApp(App);

app.use(router);
app.use(store);
app.use(ElementPlus);

// 将 axios 挂载到全局
app.config.globalProperties.$axios = axios;

app.mount("#app");