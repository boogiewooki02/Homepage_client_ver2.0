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

      <div className="flex max-pad:flex-wrap max-pad:px-[16px] pad:w-[786px] dt:w-[1200px] gap-[40px] mt-[24px] pad:mt-[40px] h-auto">
        <div className="w-[50%] max-pad:w-full">
          <AdminPageButton name="공연 예매 현황" url="/admin/ticketing" />
        </div>
        <div className="flex flex-col gap-[16px] w-[50%] max-pad:w-full">
          {AdminUrl.filter((url) => url.name !== '공연 예매 현황').map(
            (url) => (
              <div key={url.name} className="w-full">
                <AdminPageButton name={url.name} url={url.url} />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
