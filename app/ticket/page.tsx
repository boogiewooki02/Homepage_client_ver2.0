'use client';
import TicketDetail from '@/components/ticket/TicketDetail';
import { PerformanceResponse } from '@/types/performace';
import { useState } from 'react';

const Page = () => {
  const [firstTicketId, setFirstTicketId] = useState<string | null>(null);
  const [performance, setPerformance] = useState<PerformanceResponse | null>(
    null
  );

  return (
    <div className="flex relative flex-col top-16 h-[1150px] mb:h-[1000px] w-full pad:w-[768px] dt:w-[1200px] mx-auto z-10">
      <TicketDetail />
    </div>
  );
};

export default Page;
