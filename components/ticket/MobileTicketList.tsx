import WidePlaylistItem from './WidePlaylistItem';
import { RecommendData } from '../data/RecommendData';

const MobileTicketList = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="items-center mt-[21px] grid dt:grid-cols-6 pad:grid-cols-4 ph:grid-cols-1 gap-[17px]">
        {RecommendData.slice(0, 3).map((show, index) => (
          <WidePlaylistItem key={index} show={show} />
        ))}
      </div>
    </div>
  );
};

export default MobileTicketList;
