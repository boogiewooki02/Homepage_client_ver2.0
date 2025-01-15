'use client';

import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '@/atoms/authAtom';

// JWT Payload 타입 정의
interface JwtPayload {
  exp?: number;
}

// 토큰 유효성 확인 함수
function checkTokenValidity(): boolean {
  const token = Cookies.get('access_token');

  if (token) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const currentTime = Date.now() / 1000;

      // 토큰 만료 확인
      if (decoded.exp && decoded.exp > currentTime) {
        return true;
      }
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }

  // 토큰이 없거나 만료되었거나 유효하지 않은 경우
  return false;
}

// 상태 관리 및 자동 로그아웃 처리
export function useTokenValidator() {
  const [, setLoggedIn] = useRecoilState(isLoggedInState);

  useEffect(() => {
    const token = Cookies.get('access_token');

    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp && decoded.exp > currentTime) {
          // 만료 시간까지 남은 시간을 계산
          const expirationTime = decoded.exp - currentTime;

          // 만료 시간 이후 로그아웃 처리
          const timeoutId = setTimeout(() => {
            Cookies.remove('access_token');
            setLoggedIn(false);
          }, expirationTime * 1000);

          // 컴포넌트 언마운트 시 타이머 해제
          return () => clearTimeout(timeoutId);
        } else {
          // 토큰이 만료된 경우 즉시 로그아웃 처리
          Cookies.remove('access_token');
          setLoggedIn(false);
        }
      } catch (error) {
        console.error('Invalid token:', error);
        Cookies.remove('access_token');
        setLoggedIn(false);
      }
    } else {
      // 토큰이 없는 경우
      setLoggedIn(false);
    }
  }, [setLoggedIn]); // setLoggedIn 의존성
}
