import Banner from '@/components/ui/Banner';

export const AnnouncementBanner = () => {
  return (
    <div className="mx-auto w-full pad:w-[786px] dt:w-[1200px] pad:rounded-[24px] flex flex-col justify-center pad:justify-normal ">
      <Banner>
        <div className="px-20 py-16">
          <h2 className="text-center text-[36px] pad:text-[64px] font-[600] leading-[130%]">
            ANNOUNCEMENT
          </h2>
          <p className="font-pretendard text-gray-20 text-[16px] pad:text-[20px] font-[500] text-center mt-8">
            깔루아 멤버들이 이용하는 게시판입니다.
            <br />
            각종 공연 및 행사 관련 정보, 공지사항들을 확인하실 수 있습니다.
          </p>
        </div>
      </Banner>
    </div>
  );
};
