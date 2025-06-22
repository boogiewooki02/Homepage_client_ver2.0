import Image from 'next/image';
import Link from 'next/link';

import arrow from '@/public/image/arrow_right.svg';

interface TicketInfoProps {
  performanceName: string;
  place: string;
  time: string;
  day: string;
}

interface buttonProps {
  className: string;
}

const TicketInfo = ({ performanceName, place, time, day }: TicketInfoProps) => {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col max-pad:justify-end w-full h-full pad:h-[232px] max-pad:px-[32px] py-[24px] pad:pl-[36px] dt:pl-[40px] pad:py-[32px] rounded-br-[48px] rounded-l-[48px] pad:rounded-br-[32px] bg-primary-50 z-0">
        <p className="rounded-[32px] h-[32px] w-[120px] px-[12px] py-[4px] bg-gray-0 text-primary-50 text-[16px] font-medium">
          ~{day}
        </p>
        <p className="text-[20px] pad:text-[24px] font-semibold text-gray-0 mt-[12px] pad:mt-[16px]">
          {performanceName}
        </p>
        <div className="flex flex-row gap-[24px] mt-[8px] pad:mt-[16px]">
          <p className="text-[16px] pad:text-[18px] dt:text-[20px] font-medium text-primary-20">
            장소
          </p>
          <p className="text-[16px] pad:text-[18px] dt:text-[20px] font-medium text-primary-0">
            {place}
          </p>
        </div>
        <div className="flex flex-row gap-[24px] mt-[8px]">
          <p className="text-[16px] pad:text-[18px] dt:text-[20px] font-medium text-primary-20">
            일시
          </p>
          <p className="text-[16px] pad:text-[18px] dt:text-[20px] font-medium text-primary-0">
            {time}
          </p>
        </div>
      </div>
      <div className="max-pad:hidden flex flex-col">
        <div className="flex w-[214px] h-[162px] rounded-r-[48px] bg-primary-50" />
        <div className="flex relative w-[214px] h-[70px] bg-primary-50">
          <div className="flex absolute w-full h-full right-0 top-0 rounded-tl-[32px] bg-gray-0 z-10" />
          <TicketButton className="flex absolute right-0 bottom-0 z-20" />
        </div>
      </div>
    </div>
  );
};

const TicketButton = ({ className }: buttonProps) => {
  return (
    <Link
      href={'/ticket'}
      className={`flex flex-row items-center w-auto h-auto px-6 py-2 gap-[10px] bg-gray-90 text-gray-0 text-[16px] pad:text-[20px] font-medium rounded-[48px] ${className}`}
    >
      공연 예매하기
      <div className="relative w-[16px] h-[16px] pad:w-[24px] pad:h-[24px]">
        <Image src={arrow} alt=">" fill />
      </div>
    </Link>
  );
};

export { TicketInfo, TicketButton };
