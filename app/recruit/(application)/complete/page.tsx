'use client';

import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

const FreshmanTickets = () => {
  const handleToMain = () => {
    window.location.href = `/`;
  };

  return (
    <div className="flex flex-col relative top-16 items-center justify-start text-center mx-auto w-full pad:w-[786px] dt:w-[996px] h-[calc(100vh-80px)] pad:h-auto mt-4">
      <div className="h-[200px] w-full pad:rounded-t-[24px] bg-gray-90 flex flex-col mx-auto">
        <p className="mt-10 text-gray-0 text-center text-[24px] pad:text-[32px] font-semibold leading-[48px]">
          지원서 작성
        </p>
        <p className="mt-4 text-gray-20 text-center text-[16px] pad:text-[18px]  font-normal leading-[27px] hidden pad:block">
          안녕하세요! 홍익대학교 컴퓨터공학과 밴드학회 깔루아입니다.
        </p>
        <p className="text-gray-20 text-center text-[16px] pad:text-[18px]  font-normal leading-[27px] max-pad:px-6">
          단순 인원 집계용으로 사용되는 가입 지원서이므로 부담 없이 작성해
          주시면 됩니다.
        </p>
      </div>
      <div className="w-full h-auto pad:rounded-b-[24px] pad:border border-gray-15 flex flex-col items-center justify-center py-[48px] pad:py-[176px] max-pad:px-4 text-center">
        <CheckOutlinedIcon
          sx={{ color: '#fff', stroke: '#fff', strokeWidth: 1 }}
          className="w-10 h-10 bg-primary-50 rounded-full p-[10px]"
        />
        <p className="text-gray-90 text-[20px] pad:text-[24px] mt-4">
          지원서가 정상적으로 제출되었습니다.
        </p>
        <p className="text-gray-40 text-[16px] pad:text-[18px] mt-4">
          상세 일정은 작성해 주신 연락처로 개별 공지드리겠습니다.
          <br />
          홍익대학교 깔루아 밴드에 지원해주셔서 감사합니다!
        </p>
      </div>
      <button
        onClick={() => handleToMain()}
        className="text-center h-[60px] w-[328px] pad:w-[384px] text-[18px] rounded-[12px] mt-[40px] max-pad:bottom-8 max-pad:absolute pad:mb-[140px] dt:mb-[180px] bg-gray-5 text-gray-60"
      >
        메인으로 돌아가기
      </button>
    </div>
  );
};

export default FreshmanTickets;
