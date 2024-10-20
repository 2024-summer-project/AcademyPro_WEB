import axios from 'axios';

import { PATH_API } from './path';

const TIMEOUT_TIME = 10_000;

export const axiosInstance = axios.create({
  baseURL: PATH_API.API_DOMAIN,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키 cors 통신 설정
});

// 취소 토큰을 생성하는 함수
const cancelTokenSource = () => {
  const cancelToken = axios.CancelToken.source();
  return {
    token: cancelToken.token,
    cancel: cancelToken.cancel,
  };
};

let firstRequestCancelToken = null;
// Request interceptor for API calls

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('accessToken');
    /* eslint-disable no-param-reassign */
    config.headers.Authorization = `Bearer ${token}`;

    firstRequestCancelToken = cancelTokenSource();
    config.cancelToken = firstRequestCancelToken.token;
    config.timeout = TIMEOUT_TIME;
    return config;
    /* eslint-enable no-param-reassign */
  },
  (error) =>
    // 요청 전 에러 처리
    // add error handling before sending the request
    Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // invalid token
    // const originalRequest = error.config;
    // /* eslint-disable no-underscore-dangle */
    // if (error.response.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true;

    //   // 리프레시 토큰도 만료된 경우 로그아웃 처리
    //   alert('system.axios-401-error');
    //   localStorage.removeItem('accessToken');
    //   delete originalRequest.Authorization;

    //   // window.location.reload();
    //   window.location.href = PATH.root;
    //   // Promise.resolve('Error! failed token refresh');
    //   // }
    //   // }
    // }
    // /* eslint-enable no-underscore-dangle */

    // timeout
    if (axios.isCancel(error)) {
      // 취소된 요청은 에러로 처리하지 않음
      await Promise.resolve();
    }

    // 그 외의 에러는 그대로 반환
    return Promise.reject((error.response && error.response.data) || 'Something went wrong');
  }
);

export default axiosInstance;
