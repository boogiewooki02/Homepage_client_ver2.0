'use client';

import { useEffect, useState } from 'react';

import { TicketIntroPad, TicketIntroPhone } from './TicketIntro';

import { PerformanceResponse } from '@/types/performace';
import { fetchLatestPerformance } from '@/api/performance/performance';

const Ticket = () => {
  const [performance, setPerformance] = useState<PerformanceResponse | null>(
    null
  );

  useEffect(() => {
    const loadPerformance = async () => {
      const data = await fetchLatestPerformance();
      if (data) setPerformance(data);
    };
    loadPerformance();
  }, []);

  if (!performance) return null;

  return (
    <div className="flex flex-col w-full max-pad:max-w-[500px] max-pad:px-[16px] pad:w-[786px] dt:w-[1200px] h-auto items-center mt-[48px] mb-[80px] pad:mt-[120px] pad:mb-[240px] ">
      <div className="flex justify-start w-full font-mustica text-[24px] pad:text-[48px] font-semibold">
        TICKET
      </div>

      <TicketIntroPad className="max-pad:hidden" performance={performance} />
      <TicketIntroPhone className="pad:hidden" performance={performance} />
    </div>
  );
};

export default Ticket;
