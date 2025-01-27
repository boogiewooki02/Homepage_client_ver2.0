'use client';
import AdminPageButton from '@/components/admin/adminPageButton';

let AdminUrl = [
  { name: '공연 예매 현황', url: '/admin/ticketing' },
  { name: '지원 현황', url: '/admin/applicant' },
  { name: '공연 정보 관리', url: '/admin/performanceInfo' },
  { name: '지원 정보 관리', url: '/admin/recruitingInfo' },
];

const page = () => {
  return (
    <div className="w-full h-auto min-h-[calc(100vh-390px)] flex flex-col mt-16 text-black font-pretendard items-center">
      <div className="w-full h-[148px] pad:h-[260px] bg-gray-5 py-[32px] pad:py-[64px] flex flex-col justify-center items-center px-[16px]">
        <div className="w-full pad:w-[786px] dt:w-[1200px] h-full flex flex-col gap-[24px]">
          <p className="text-[36px] pad:text-[64px] font-semibold leading-none">
            Admin
          </p>
          <p className="text-[16px] pad:text-[24px] font-semibold">
            KAHLUA Admin Page
          </p>
        </div>
      </div>

      <div className="w-full pad:w-[786px] dt:w-[1200px] mt-[40px] grid grid-cols-1 pad:grid-cols-2 gap-[40px]">
        {AdminUrl.map((url) => (
          <div
            className={`w-full pad:w-[373px] dt:w-[580px] h-[76px] ${
              url.name === '지원 현황' ? 'order-1' : 'order-1' // "지원 현황"을 두 번째로 정렬
            }`}
            key={url.name}
          >
            <AdminPageButton name={url.name} url={url.url} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
