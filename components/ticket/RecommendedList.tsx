import MobileTicketList from './MobileTicketList';
import DesktopTicketList from './DesktopTicketList';

const RecommendedList = () => {
  return (
    <div className="w-full max-[833px]:mt-4 mt-10 flex flex-col items-center max-pad:pb-[160px]">
      <span className="flex items-center text-gray-80 font-pretendard text-lg text-left w-full max-[833px]:w-[344px] mx-auto">
        다른 공연 보러가기
      </span>

      <div className="min-[834px]:hidden">
        <MobileTicketList />
      </div>

      <div className="max-[833px]:hidden">
        <DesktopTicketList />
      </div>
    </div>
  );
};

export default RecommendedList;
