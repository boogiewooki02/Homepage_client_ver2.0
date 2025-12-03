import Image from 'next/image';
import React from 'react';

import { TicketButton, TicketInfo } from './TicketInfo';

import { PerformanceResponse } from '@/types/performace';
import { formatDate, formatDateTime } from '@/utils/dateUtils';

interface TicketIntroProps {
  className?: string;
  performance: PerformanceResponse;
}

export const TicketIntroPad = ({
  className = '',
  performance,
}: TicketIntroProps) => {
  const day = formatDate(performance.booking_end_date);
  const time = formatDateTime(performance.performance_start_time);

  return (
    <div
      className={`flex flex-row w-full h-auto mt-[32px] gap-[32px] ${className}`}
    >
      <div className="flex shrink-0 relative rounded-[16px] w-[264px] h-[351px] pad:w-[246px] pad:h-[329px] dt:w-[282px] dt:h-[377px]">
        <Image
          src={performance.poster_image_url}
          alt="poster"
          fill
          sizes="100vw"
          priority
        />
      </div>
      <div className="flex flex-col justify-end w-full h-auto gap-[32px]">
        <p className="pad:text-[24px] dt:text-[32px] font-semibold">
          깔루아 공연!
          <br />
          홈페이지에서 간편하게 예매하세요
        </p>
        <TicketInfo
          day={day}
          performanceName={performance.title}
          place={performance.venue}
          time={time}
        />
      </div>
    </div>
  );
};

export const TicketIntroPhone = ({
  className = '',
  performance,
}: TicketIntroProps) => {
  const day = formatDate(performance.booking_end_date);
  const time = formatDateTime(performance.performance_start_time);

  return (
    <div
      className={`flex flex-col justify-center items-center w-full h-full ${className}`}
    >
      <div className="flex justify-center relative w-full h-[532px] mt-[24px]">
        <div className="flex flex-col items-end w-full absolute top-[64px]">
          <div className="flex h-[100px] w-full bg-primary-50 rounded-t-[32px] rounded-bl-[32px] z-0" />
          <div className="flex h-[105px] w-[120px] bg-primary-50 z-0" />
          <div className="flex h-[262px] w-full bg-primary-50 rounded-b-[32px] rounded-tl-[32px] z-0">
            <TicketInfo
              day={day}
              performanceName={performance.title}
              place={performance.venue}
              time={time}
            />
          </div>
        </div>

        <div className="flex shrink-0 absolute top-0 rounded-[16px] w-[264px] h-[351px]">
          <Image src={performance.poster_image_url} alt="poster" fill />
        </div>
      </div>
      <TicketButton className="flex mt-[32px]" />
    </div>
  );
};
