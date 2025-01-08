import Image from 'next/image';
import profileImg from '@/public/image/mypage/profile.png';

interface userProps {
  name: string;
  generation: number;
  session: string;
}

const dummyUser: userProps = {
  name: '홍길동',
  generation: 20,
  session: '보컬',
};

const UserProfile = () => {
  return (
    <section className="w-full h-[148px] pad:h-[260px] bg-gray-5 flex items-center">
      <div className="w-full px-6 pad:px-0 pad:w-[786px] dt:w-[1200px] flex justify-between mx-auto gap-8">
        <div className="flex my-auto gap-4 pad:my-0 pad:flex-row flex-col w-full pad:justify-between items-start self-stretch">
          <h1 className="text-gary-90 pad:text-[64px] leading-[100%] text-[36px] font-semibold">
            My Page
          </h1>
          <div className="flex justify-end items-end pad:self-stretch gap-2 font-semibold">
            <p className="text-gray-90 text-2xl">{dummyUser.name}</p>
            <div className="flex text-primary-50 text-[22px] gap-1">
              <p>{dummyUser.generation}기</p>
              <p>{dummyUser.session}</p>
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
