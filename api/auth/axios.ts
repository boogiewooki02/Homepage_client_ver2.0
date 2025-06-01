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

    if (config.headers && accessToken) {
      config.headers.authorization = `Bearer ${accessToken}`;
      config.headers.refreshToken = `Bearer ${refreshToken}`;
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

    if (status === 401 && error.response.data.error === 'Unauthorized') {
      const originalRequest = config;
      const refreshToken = Cookie.get('refresh_token');

      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/recreate`,
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        const { access_token: newAccessToken, refresh_token: newRefreshToken } =
          data;

        Cookie.set('access_token', newAccessToken, {
          path: '/',
          secure: true,
          sameSite: 'Strict',
        });
        Cookie.set('refresh_token', newRefreshToken, {
          path: '/',
          secure: true,
          sameSite: 'Strict',
        });

        originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.refreshToken = `Bearer ${newRefreshToken}`;

        // authInstance로 재요청
        return authInstance(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
