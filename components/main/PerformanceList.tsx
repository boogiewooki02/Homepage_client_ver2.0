import { SongList } from '@/components/data/SongList';
import { song } from '@/components/data/SongList';
import PerformanceCard from './PerformanceCard';

interface SonglistProps {
  songs: song[];
  range: [number, number];
}

const PerformanceList = () => {
  return (
    <div className="overflow-hidden w-full flex flex-col">
      <div className="animate-slide-right-ph1 pad:animate-slide-right-dt1 hover:animation-pause mt-[24px] pad:mt-[32px]">
        <div className="flex flex-nowrap gap-[16px] pad:gap-[24px]">
          <Playlist songs={SongList} range={[0, 6]} />
          <Playlist songs={SongList} range={[0, 6]} />
        </div>
      </div>
      <div className="animate-slide-left-ph2 pad:animate-slide-left-dt2 hover:animation-pause mt-[32px] pad:mt-[72px]">
        <div className="flex flex-nowrap gap-[16px] pad:gap-[24px]">
          <Playlist songs={SongList} range={[7, SongList.length - 1]} />
          <Playlist songs={SongList} range={[7, SongList.length - 1]} />
        </div>
      </div>
    </div>
  );
};

export default PerformanceList;

const Playlist = ({ songs, range }: SonglistProps) => {
  const [start, end] = range;

  return (
    <div className="flex flex-nowrap w-auto h-auto gap-[16px] pad:gap-[24px]">
      {songs.slice(start, end + 1).map((song) => (
        <PerformanceCard key={song.id} song={song} />
      ))}
    </div>
  );
};
