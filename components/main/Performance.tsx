import Image from 'next/image';
import Link from 'next/link';

import PerformanceList from './PerformanceList';

import arrow from '@/public/image/arrow_right.svg';

interface buttonProps {
  className: string;
}

const Performance = () => {
  return (
    <div className="flex flex-col w-full items-center mt-[48px] mb-[48px] pad:mt-[120px] pad:mb-[120px]">
      <div className="flex flex-row justify-start pad:justify-between items-center w-full h-auto max-pad:max-w-[500px] max-pad:px-[16px] pad:w-[786px] dt:w-[1200px]">
        <p className="font-mustica text-[24px] justify-start pad:text-[48px] font-semibold">
          PERFORMANCE
        </p>
        <PerformanceButton className="max-pad:hidden" />
      </div>

      <PerformanceList />

      <PerformanceButton className="pad:hidden mt-[32px]" />
    </div>
  );
};

export default Performance;

const PerformanceButton = ({ className }: buttonProps) => (
  <Link
    href="/performance"
    className={`flex flex-row items-center w-auto h-auto px-6 py-2 gap-[10px] bg-gray-90 text-gray-0 text-[16px] pad:text-[20px] font-medium rounded-[48px] ${className}`}
  >
    공연 영상 보러가기
    <div className="relative w-[16px] h-[16px] pad:w-[24px] pad:h-[24px]">
      <Image src={arrow} alt=">" fill />
    </div>
  </Link>
);
