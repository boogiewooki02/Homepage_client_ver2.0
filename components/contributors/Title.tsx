import Image from 'next/image';
import logo_white from '@/public/image/KAHLUA.svg';

const Title = () => {
  return (
    <div className="flex top-0 justify-center h-[322px] pad:h-[753px] dt:h-[480px] w-full bg-performance bg-center text-gray-0">
      <div className="flex flex-col dt:mt-[184px] pad:mt-[152px] mt-[120px] items-center text-center w-full pad:w-[786px] dt:w-[1200px]">
        <div className="flex relative pad:w-[376px] pad:h-[64px] w-[235px] h-[40px]">
          <Image src={logo_white} fill alt="logo" sizes="100vw" />
        </div>
        <p className="dt:text-[32px] font-medium text-gray-10 pad:text-[24px] text-[20px] leading-normal dt:mt-6 mt-8">
          CONTRIBUTORS
        </p>
      </div>
    </div>
  );
};
export default Title;
