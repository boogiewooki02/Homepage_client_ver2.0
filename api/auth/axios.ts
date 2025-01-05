import axios from 'axios';
import Cookie from 'js-cookie';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

authInstance.interceptors.request.use(
  function (config) {
    const accessToken = Cookie.get('access_token');
    const refreshToken = Cookie.get('refresh_token');

    // 요청 시 AccessToken 계속 보내주기
    if (!accessToken) {
      config.headers.accessToken = null;
      config.headers.refreshToken = null;
      return config;
    }

    if (config.headers && accessToken) {
      config.headers.authorization = `Bearer ${accessToken}`;
      config.headers.refreshToken = `Bearer ${refreshToken}`;
      return config;
    }
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
authInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    if (status === 401) {
      if (error.response.data.error === 'Unauthorized') {
        const originalRequest = config;
        const refreshToken = await Cookie.get('access_token');
        // token refresh 요청
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/recreate`, // token refresh api
          { headers: { Authorization: `Bearer ${refreshToken}` } }
        );
        // 새로운 토큰 저장
        // dispatch(userSlice.actions.setAccessToken(data.data.accessToken)); store에 저장
        const { access_token: newAccessToken, refresh_token: newRefreshToken } =
          data;
        document.cookie = `access_token=${newAccessToken}; path=/; Secure; HttpOnly; SameSite=Strict`;
        document.cookie = `refresh_token=${newRefreshToken}; path=/; Secure; SameSite=Strict`;

        originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
        // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
        return axios(originalRequest);
      }
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
