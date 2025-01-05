'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { axiosInstance } from '@/api/auth/axios';
import { useSetRecoilState } from 'recoil';
import { isLoggedInState } from '@/atoms/authAtom';

const page = () => {
  const router = useRouter();
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  const setTokensInCookie = (accessToken: string, refreshToken: string) => {
    const isSecure = window.location.protocol === 'https:';

    document.cookie = `access_token=${accessToken}; path=/; ${isSecure ? 'Secure' : ''}; SameSite=Strict`;
    document.cookie = `refresh_token=${refreshToken}; path=/; ${isSecure ? 'Secure' : ''}; SameSite=Strict`;
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const code = query.get('code');

    const handleAuth = async () => {
      try {
        const response = await axiosInstance.post(
          `/auth/kakao/sign-in?code=${code}`
        );

        const { accessToken, refreshToken } = response.data;

        // 쿠키에 토큰 저장
        setTokensInCookie(accessToken, refreshToken);

        if (response.data.role == 'GENERAL') {
          router.push('/login/info'); // 추가 정보 입력 페이지로 이동
        } else {
          setIsLoggedIn(true);
          router.push('/'); // 메인 페이지로 이동
        }
      } catch (error) {
        console.error('Authentication failed:', error);
        alert('로그인 처리 중 오류가 발생했습니다.');
      }
    };

    if (code) {
      handleAuth();
    } else {
      console.error('No code found in URL');
    }
  }, [router, setIsLoggedIn]);

  return <div className="h-screen">Redirecting...</div>;
};

export default page;
