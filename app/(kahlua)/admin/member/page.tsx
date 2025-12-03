'use client';

import { useRef, useState } from 'react';

import { authInstance } from '@/api/auth/axios';
import Header from '@/components/admin/Header';
import StatusIcon from '@/components/admin/member/StatusIcon';
import TableSection, {
  TableSectionRef,
} from '@/components/admin/member/table/TableSection';
import CompletedIcon from '@/public/image/admin/CompletedIcon.svg';
import CompletedMobileIcon from '@/public/image/admin/CompletedMobileIcon.svg';
import WaitingIcon from '@/public/image/admin/WaitingIcon.svg';
import WaitingMobileIcon from '@/public/image/admin/WaitingMobileIcon.svg';

const MemberPage = () => {
  const [isWaiting, setIsWaiting] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [waitingCount, setWaitingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const tableRef = useRef<TableSectionRef>(null);

  const handleApplyChanges = async () => {
    const changedMembers = tableRef.current?.getChangedMembers();
    if (!changedMembers || changedMembers.length === 0) {
      alert('변경된 내용이 없습니다.');
      return;
    }

    try {
      await Promise.all(
        changedMembers.map((member) =>
          authInstance.patch(
            `/admin/users/${member.id}?userType=${member.userType}`
          )
        )
      );
      alert('변경사항이 성공적으로 적용되었습니다.');
      tableRef.current?.refreshOriginMembers();
    } catch (error) {
      alert('업데이트 중 오류가 발생했습니다.');
    }
  };

  const handleToggleWaiting = () => {
    setIsWaiting((prev) => !prev);
    setCurrentPage(0);
  };

  return (
    <div className="w-full h-auto min-h-[calc(100vh-390px)] flex flex-col mt-16 text-black font-pretendard items-center">
      <Header subtitle="깔루아 멤버 정보 관리" />

      <div className="w-full max-pad:px-4">
        <div className="flex flex-col h-auto min-[1500px]:w-[1200px] min-[834px]:w-[786px] max-pad:max-w-[500px] mt-[134px] max-dt:mt-[107px] max-pad:mt-6 mx-auto">
          <div className="flex max-pad:flex-col gap-[75px] max-pad:gap-[10px]">
            <StatusIcon
              icon={WaitingIcon}
              mobileIcon={WaitingMobileIcon}
              alt="승인 대기"
              label="승인 대기"
              count={waitingCount}
            />
            <StatusIcon
              icon={CompletedIcon}
              mobileIcon={CompletedMobileIcon}
              alt="승인 완료"
              label="승인 완료"
              count={completedCount}
            />
          </div>

          <TableSection
            ref={tableRef}
            isWaiting={isWaiting}
            setWaitingCount={setWaitingCount}
            setCompletedCount={setCompletedCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />

          <span
            onClick={handleToggleWaiting}
            className="flex self-end mt-[-32px] max-pad:mt-[-20px] text-2xl max-dt:text-[20px] max-pad:text-sm font-semibold cursor-pointer"
          >
            {isWaiting ? '전체 보기' : '승인 대기만 보기'}
          </span>

          <button
            onClick={handleApplyChanges}
            className="flex self-center mt-[100px] items-center justify-center w-[384px] max-pad:w-[310px] h-[60px] p-[10px] font-semibold text-[22px] text-gray-0 bg-primary-50 rounded-xl"
          >
            적용하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberPage;
