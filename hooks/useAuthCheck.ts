import Cookie from 'js-cookie';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { isLoggedInState } from '@/atoms/authAtom';

export const useAuthCheck = () => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  useEffect(() => {
    const accessToken = Cookie.get('access_token');
    const refreshToken = Cookie.get('refresh_token');
    setIsLoggedIn(!!(accessToken && refreshToken));
  }, []);
};
