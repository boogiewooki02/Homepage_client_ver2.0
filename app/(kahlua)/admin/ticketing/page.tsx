'use client';

import PublishIcon from '@mui/icons-material/Publish';
import WestIcon from '@mui/icons-material/West';
import Link from 'next/link';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { authInstance } from '@/api/auth/axios';
import { totalTicket } from '@/atoms';
import TicketInfoSection from '@/components/admin/ticketing/TicketInfoSection';
import { information } from '@/components/data/Information';

const AdminTicketingPage = () => {
  const typeArr = ['All', '신입생', '일반'];
  const [type, setType] = useState('All');
  const total = useRecoilValue(totalTicket);

  const getList = async () => {
    try {
      const response = await authInstance.get('/admin/tickets/download', {
        responseType: 'blob',
      });

      const blob = response.data;
      const fileObjectUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = fileObjectUrl;
      link.style.display = 'none';
      link.download = 'ticket_list.xlsx';

      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(fileObjectUrl);
    } catch (error: any) {}
  };

  return (
    <div className="w-full h-full overflow-x-auto">
      <div className="font-pretendard w-full pt-16 flex flex-col items-center">
        <div className="w-full h-auto min-h-[180px] pad:h-[240px] bg-gray-5 flex flex-col pad:flex-row justify-between px-4 pad:px-8 dt:px-[120px]">
          <div className="flex flex-col mt-6 pad:mt-12">
            <span className="font-mustica text-[28px] pad:text-[36px] text-gray-90 font-semibold leading-10 pb-3">
              Ticketing List
            </span>
            <section className="flex gap-2 pb-4 pad:pb-8 items-center">
              <span className="font-pretendard text-lg pad:text-xl text-gray-90 font-semibold leading-9">
                {information.title}
              </span>
              <span className="font-pretendard text-lg pad:text-xl text-primary-50 font-semibold leading-9">
                {total}
              </span>
              <span
                className="w-4 px-4 cursor-pointer"
                onClick={() => getList()}
              >
                <PublishIcon sx={{ color: '#757A95' }} />
              </span>
            </section>
            <section className="w-full pad:w-[252px] h-8 rounded-[32px] bg-gray-0 overflow-x-auto whitespace-nowrap">
              <div className="inline-flex">
                {typeArr.map((typeName) => (
                  <div
                    key={typeName}
                    onClick={() => {
                      setType(typeName);
                    }}
                    className={`${
                      type === typeName ? 'bg-primary-50' : 'bg-gray-0'
                    } min-w-[80px] inline-flex px-3 py-1 justify-center items-center gap-2 rounded-[32px] cursor-pointer`}
                  >
                    <span
                      className={`${
                        type === typeName ? 'text-gray-0' : 'text-gray-50'
                      } text-center font-pretendard text-[14px] pad:text-[16px] font-medium leading-6`}
                    >
                      {typeName}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      <TicketInfoSection type={type} />

      {/* admin 홈으로 Button */}
      <div className="flex h-auto mx-auto w-full px-4 pad:px-8 dt:px-[120px]">
        <Link
          href="/admin"
          key="admin"
          className="flex flex-row gap-2 items-center my-6"
        >
          <WestIcon />
          <span className="text-[16px] font-medium">Admin 홈으로</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminTicketingPage;
