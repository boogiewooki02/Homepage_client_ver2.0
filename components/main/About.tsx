import TopRightRoundBorder from '@/components/ui/RoundBorder';
import Image from 'next/image';
import music from '@/public/image/main/mainMusic.svg';
import Link from 'next/link';
import arrow from '@/public/image/arrow_right.svg';

export default function About() {
  return (
    <div className="flex flex-col w-full max-pad:max-w-[500px] max-pad:px-[16px] items-center mb-[48px] pad:mb-[120px]">
      <div className="w-full h-[260px] pad:w-[786px] dt:w-[1200px] pad:h-[744px] bg-mainAbout bg-center bg-contain object-contain rounded-[32px] pad:rounded-[48px] border-none relative z-0">
        <p className="font-mustica text-[24px] pad:text-[40px] dt:text-[64px] font-semibold text-gray-0 m-[24px] pad:m-[56px]">
          Hongik University
          <br />
          Computer Engineering
          <br />
          Band Club KAHLUA!
        </p>

        {/* right top 흰상자 */}
        <TopRightRoundBorder className="absolute right-[184px] -top-[20px] hidden pad:block" />
        <div className="absolute -right-[20px] -top-[20px] bg-gray-0 rounded-bl-[48px] w-[224px] h-[134px] z-20 hidden pad:block" />
        <TopRightRoundBorder className="absolute -right-[20px] top-[94px] hidden pad:block" />

        {/* pad: right top 파란상자 ph: bottome left 파란상자 */}
        <div className="w-[144px] h-[56px] pad:w-[180px] pad:h-[90px] absolute bottom-0 max-pad:left-0 pad:top-0 pad:right-0 bg-primary-50 rounded-[48px] z-30">
          <div className="absolute w-[179px] h-[120px] pad:w-[195px] pad:h-[128px] bottom-0 left-[6px] pad:left-[16px]">
            <Image src={music} fill alt="music" />
          </div>
        </div>

        {/* left bottom 흰상자 */}
        <TopRightRoundBorder className="absolute -left-[16px] bottom-[56px] pad:-left-[20px] pad:bottom-[304px] rotate-180" />
        <TopRightRoundBorder className="absolute left-[144px] -bottom-[16px] pad:left-[388px] pad:-bottom-[20px] rotate-180" />
        <div className="absolute -left-[16px] -bottom-[16px] rounded-tr-[32px] w-[176px] h-[88px] pad:-left-[20px] pad:-bottom-[20px] bg-gray-0 pad:rounded-tr-[48px] pad:w-[428px] pad:h-[344px] z-20" />

        {/* left bottom 파란상자 */}
        <div className="max-pad:hidden pad:absolute pad:left-0 pad:bottom-0 z-30">
          <AboutSmallBox />
        </div>
      </div>
      <div className="w-full h-[232px] relative mt-6 pad:hidden">
        <AboutSmallBox />
      </div>
    </div>
  );
}

const AboutSmallBox = () => {
  return (
    <div className="w-full h-full pad:w-[384px] pad:h-[300px] rounded-[32px] pad:rounded-[48px] bg-primary-50 z-0 text-gray-0 py-[24px] px-[32px] pad:py-[32px] pad:px-[40px]">
      <p className="text-[24px] font-semibold pad:text-[32px] pad:font-bold">
        아 우리는
        <br />깔 깔 깔 깔루아!
      </p>
      <p className="text-[16px] pad:text-[20px] font-medium text-primary-10 mt-[16px] pad:mt-[24px]">
        KAHLUA는 2003년부터 지금까지
        <br />
        23년의 전통을 이어오고 있는
        <br />
        홍익대학교 컴퓨터공학과
        <br />
        밴드학회입니다.
      </p>

      {/* right bottome 흰상자 */}
      <div className="absolute -right-[16px] -bottom-[16px] pad:-right-[20px] pad:-bottom-[20px] rounded-tl-[32px] pad:rounded-tl-[48px] bg-gray-0 z-20 w-[88px] h-[88px] pad:w-[122px] pad:h-[122px]" />
      <TopRightRoundBorder className="absolute rotate-90 -right-[16px] bottom-[56px] pad:-right-[20px] pad:bottom-[82px]" />
      <TopRightRoundBorder className="absolute rotate-90 right-[56px] -bottom-[16px] pad:right-[82px] pad:-bottom-[20px]" />

      {/* about page 연결 버튼 */}
      <Link
        href="/about"
        key="about"
        className="absolute flex justify-center items-center right-0 bottom-0 w-[56px] h-[56px] pad:w-[78px] pad:h-[78px] z-30 bg-gray-90 rounded-full"
      >
        <div className="relative w-[40px] h-[40px] pad:w-[56px] pad:h-[56px]">
          <Image src={arrow} fill alt=">" />
        </div>
      </Link>
    </div>
  );
};
