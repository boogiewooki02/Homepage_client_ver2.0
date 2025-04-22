'use client';

import Header from '@/components/admin/Header';
import MemberTable from '@/components/admin/member/table/Table';

const MessagePage = () => {
  return (
    <div className="w-full h-auto min-h-[calc(100vh-390px)] flex flex-col mt-16 text-black font-pretendard items-center">
      <Header subtitle="문자 전송" />
    </div>
  );
};

export default MessagePage;
