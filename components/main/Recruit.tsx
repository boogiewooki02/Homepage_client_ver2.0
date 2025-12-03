import Image from 'next/image';
import Link from 'next/link';

import guitar from '@/public/image/recruit/guitar.svg';
import syn from '@/public/image/recruit/syn.svg';

export default function Recruit() {
  return (
    <div className="flex flex-col w-full justify-center items-center pt-[158px] pb-[200px] pad:pt-[120px] pad:pb-[300px] text-gray-0">
      <p className="font-mustica text-[32px] pad:text-[48px] font-semibold">
        Join Us!
      </p>
      <p className="font-pretendard text-[24px] pad:text-[32px] font-semibold mt-[24px] pad:mt-[40px] ">
        우리 같이 깔루아할래요?
      </p>
      <p className="font-pretendard text-[16px] pad:text-[24px] text-gray-50 font-medium mt-[8px]">
        깔루아는 매년 3월 멤버를 모집하고 있어요
      </p>
      <RecruitButton />
    </div>
  );
}

const RecruitButton = () => {
  return (
    <div className="flex relative justify-center w-[278px] h-[62px] pad:w-[404px] pad:h-[84px] mt-[72px] pad:mt-[104px]">
      <Link
        href="/recruit"
        className="flex justify-center items-center w-full h-full rounded-[48px] bg-gradient-to-r from-[#128DFF] to-primary-50 text-[20px] pad:text-[24px] font-semibold z-20"
      >
        지원하기
      </Link>
      <Image
        src={syn}
        sizes="100vw"
        alt="."
        className="flex absolute -rotate-[20deg] -left-[36px] -top-[30px] pad:-left-[64px] pad:-top-[56px] w-[72px] h-[72px] pad:w-[120px] pad:h-[120px] z-10"
      />
      <Image
        src={guitar}
        sizes="100vw"
        alt="."
        className="flex absolute -right-[26px] -bottom-[26px] pad:-right-[44px] pad:-bottom-[38px] w-[72px] h-[72px] pad:w-[120px] pad:h-[120px] z-30"
      />
    </div>
  );
};
