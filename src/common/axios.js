import Axios from 'axios';

// 配置axios
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
        ElMessage.error(msg);
      }
    } else {
      ElMessage.error("网络错误，请检查您的网络并稍后重试");
    }
    return Promise.reject(error);
  }
);
Axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token') || '';
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default Axios;