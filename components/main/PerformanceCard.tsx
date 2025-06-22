import Image from 'next/image';
import { song } from '../data/SongList';

interface SongProps {
  song: song;
}

const PerformanceCard = ({ song }: SongProps) => {
  return (
    // hover시 카드 크기 키우려면 hover:pad:w-[440px]
    <div className="w-[282px] pad:w-[384px] ease-in-out h-auto flex flex-col items-start">
      <Image
        src={song.src}
        alt="thumbnail"
        quality={50}
        className="w-[282px] pad:w-[384px] rounded-[12px]"
        sizes="(max-width: 834px) 282px, 384px"
        width={384}
        height={216}
      />
      <p className="text-[20px] pad:text-[22px] font-semibold mt-[8px] pad:mt-[12px]">
        {song.name}
      </p>
      <span className="text-[16px] pad:text-[18px] text-gray-40 font-medium mt-[4px]">
        {song.description}
      </span>
    </div>
  );
};

export default PerformanceCard;
