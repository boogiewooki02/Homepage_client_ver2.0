'use client';

import { useEffect, useState } from 'react';
import MobileTicketList from './MobileTicketList';
import DesktopTicketList from './DesktopTicketList';
import { axiosInstance } from '@/api/auth/axios';

const RecommendedList = ({ id }: { id: number }) => {
  const [ticketList, setTicketList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getTicketLists = async () => {
    try {
      const response = await axiosInstance.get('/performances', {
        params: { limit: 100 },
      });
      if (response.data.isSuccess) {
        setTicketList(response.data.result.performances);
      }
    } catch (error) {
      console.error('공연 목록 불러오는 중 오류 발생:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTicketLists();
  }, []);

  return (
    <div className="w-full max-[833px]:mt-4 mt-10 flex flex-col items-center max-pad:pb-[160px]">
      <span className="flex items-center text-gray-80 font-pretendard text-lg text-left w-full max-[833px]:w-[344px] mx-auto">
        다른 공연 보러가기
      </span>

      <div className="min-[834px]:hidden">
        <MobileTicketList tickets={ticketList} currentId={id} />
      </div>

      <div className="max-[833px]:hidden">
        <DesktopTicketList tickets={ticketList} currentId={id} />
      </div>
    </div>
  );
};

export default RecommendedList;
