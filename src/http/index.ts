import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { notification } from 'antd';

const service = axios.create({
  headers: {'Content-Type': 'application/json'},
  timeout: 60000
});
// service.defaults.baseURL = 'http://localhost:3000';

// http request 拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // const { params } = config;
    return config;
  },
  (err: any) => {
    return Promise.reject(err);
  }
);

// http response 拦截器
service.interceptors.response.use(
  (response: any) => {
    // 做一些处理
    return response;
  },
  (error: any) => {
    if (error.response) {
      const { status, data } = error.response;
      switch(status) {
        case 401: console.log('401')
          break;
        case 404: notification.warning({
          message: '通知信息',
          description:
            '404了',
        });
          break;
      }
    }
    return Promise.reject(error);
  }
);
export default service;
