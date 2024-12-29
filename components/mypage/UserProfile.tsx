import Image from 'next/image';
import profileImg from '@/public/image/mypage/profile.png';
import { authInstance } from '@/api/auth/axios';
import { useState, useEffect } from 'react';

interface userProps {
  name: string;
  term: number;
  session: string;
}

// 세션 응답 데이터와 매핑되는 정보
const sessionMapping: { [key: string]: string } = {
  VOCAL: '보컬',
  BASS: '베이스',
  GUITAR: '기타',
  DRUM: '드럼',
  SYNTHESIZER: '신디',
  MANAGER: '매니저',
};

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState<userProps>({
    name: '',
    term: 0,
    session: '',
  });

  const getUserInfo = async () => {
    try {
      const response = await authInstance.get('/user');

      if (response.data.isSuccess) {
        setUserInfo({
          name: response.data.result.name,
          term: response.data.result.term.toString(),
          session: sessionMapping[response.data.result.session],
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <section className="w-full h-[148px] pad:h-[260px] bg-gray-5 flex items-center">
      <div className="w-full px-6 pad:px-0 pad:w-[786px] dt:w-[1200px] flex justify-between mx-auto gap-8">
        <div className="flex my-auto gap-4 pad:my-0 pad:flex-row flex-col w-full pad:justify-between items-start self-stretch">
          <h1 className="text-gary-90 pad:text-[64px] leading-[100%] text-[36px] font-semibold">
            My Page
          </h1>
          <div className="flex justify-end items-end pad:self-stretch gap-2 font-semibold">
            <p className="text-gray-90 text-2xl">{userInfo.name}</p>
            <div className="flex text-primary-50 text-[22px] gap-1">
              <p>{userInfo.term}기</p>
              <p>{userInfo.session}</p>
            </div>
          </div>
        </div>
        <div>
          <Image
            src={profileImg}
            alt="default-profile"
            width={174}
            height={174}
          />
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
