'use client';

import Image from 'next/image';
import google from '@/public/image/login/google.svg';
import kakao from '@/public/image/login/kakao.svg';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const page = () => {
  const router = useRouter();

  const kakao_link = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}`;
  const google_link = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const code = query.get('code');

    if (code) {
      const handleKakaoAuth = async () => {
        try {
          // OAuth 인증 코드 전송 및 액세스 토큰 발급
          const { data: tokenData } = await axios.post(
            '/v1/auth/kakao/sign-in',
            { code }
          );

          if (tokenData.isMember) {
            // 회원인 경우 메인페이지 이동
            router.push('/');
          } else {
            // 회원이 아닌 경우 info 페이지 이동
            router.push('/login/info');
          }
        } catch (error) {
          console.error('Kakao login failed:', error);
        }
      };

      handleKakaoAuth();
    }
  }, [router]);

  return (
    <div className="font-pretendard min-h-[calc(100vh)] w-full h-full flex flex-col items-center mt-16 max-pad:bg-gray-90 text-gray-0 text-center max-pad:-mb-40">
      <div className="justify-center items-center w-full pad:w-[786px] dt:w-[876px] h-full pad:h-[536px] flex flex-col pt-[32px] pad:pt-[58px] pb-[78px] px-[16px] pad:px-[64px] dt:px-[118px] gap-[48px] bg-gray-90 pad:rounded-[24px] mt-[16px] pad:mt-[32px]">
        <div className="flex flex-col gap-[16px] w-full justify-center items-center">
          <div className="font-semibold text-[64px]">LOGIN</div>
          <div className="font-medium text-[16px] pad:text-[20px] text-gray-20">
            깔루아 회원 로그인 페이지입니다.
            <br />
            로그인 이후 KAHLUA 전용 서비스를 이용하실 수 있습니다.
          </div>
        </div>
        <div className="flex flex-col gap-[24px] w-full max-pad:max-w-[500px] pad:w-[400px] justify-center items-center">
          <div
            className="flex flex-row w-full h-[78px] px-[20px] py-[10px] justify-center items-center gap-[42px] rounded-[20px] bg-black"
            onClick={() => {
              window.location.href = kakao_link;
            }}
          >
            <Image src={kakao} alt="kakao" width={58} height={58} />
            <p className="font-medium text-[20px] w-full text-start">
              카카오로 로그인하기
            </p>
          </div>
          <div
            className="flex flex-row w-full h-[78px] px-[20px] py-[10px] justify-center items-center gap-[42px] rounded-[20px] bg-black"
            onClick={() => {
              window.location.href = google_link;
            }}
          >
            <Image src={google} alt="google" width={58} height={58} />
            <p className="font-medium text-[20px] w-full text-start">
              구글로 로그인하기
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
