import axios from 'react-native-axios';
import {baseUrl, SESSION_EXPIRED_MESSAGE, TOKEN} from './constants';

const instance = axios.create({
  baseURL: `${baseUrl}`,
  timeout: 1000 * 10, // Wait for 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: status => {
    return true;
  },
});

instance.interceptors.request.use(
  config => {
    const token = TOKEN;
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token; // for Spring Boot back-end
      //   config.headers["x-access-token"] = token; // for Node.js Express back-end
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  res => {
    if (res?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      alert(SESSION_EXPIRED_MESSAGE);
      //   setTimeout(() => {
      //     window.location.replace('/login');
      //   }, 500);
    } else if (res?.headers?.token) {
      //   setLocalStorage(TOKEN, res?.headers?.token);
    }
    return res;
  },
  async err => {},
);

export default instance;
