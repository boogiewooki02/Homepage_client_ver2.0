'use client';

import TicketDetail from '@/components/ticket/TicketDetail';

const Page = () => {
  return (
    <div className="flex relative flex-col top-16 h-[1150px] mb:h-[1000px] w-full pad:w-[768px] dt:w-[1200px] mx-auto z-10">
      <TicketDetail />
    </div>
  );
};

export default Page;
