'use client';
import { useEffect, useState } from 'react';
import TicketDetail from '@/components/ticket/TicketDetail';
import { axiosInstance } from '@/api/auth/axios';

const Page = () => {
  const [firstTicketId, setFirstTicketId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axiosInstance.get('/performances');
        if (response.data.isSuccess) {
          setFirstTicketId(response.data.result.performances[0].ticketInfoId);
        }
      } catch (error) {
        console.error('Error fetching performances:', error);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="flex relative flex-col top-16 h-[1150px] mb:h-[1000px] w-full pad:w-[768px] dt:w-[1200px] mx-auto z-10">
      <TicketDetail id={firstTicketId || ''} />
    </div>
  );
};

export default Page;
