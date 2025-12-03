'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import TicketDetail from '@/components/ticket/TicketDetail';

const Page = () => {
  const pathname = usePathname();
  const [ticketId, setTicketId] = useState<string | null>(null);

  useEffect(() => {
    const getTicketIdFromURL = () => {
      const pathSegments = pathname.split('/');
      return pathSegments.length > 2 ? pathSegments[2] : null;
    };

    setTicketId(getTicketIdFromURL());
  }, [pathname]);

  return (
    <div className="flex relative flex-col top-16 h-[1150px] mb:h-[1000px] w-full pad:w-[768px] dt:w-[1200px] mx-auto z-10">
      <TicketDetail id={ticketId || ''} />
    </div>
  );
};

export default Page;
