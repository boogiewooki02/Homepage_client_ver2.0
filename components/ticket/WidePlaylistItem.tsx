import Image from 'next/image';
import Link from 'next/link';

interface Show {
  title: string;
  image: string;
  link: string;
  description: string;
  isLive?: boolean;
}

const WidePlaylistItem = ({ show }: { show: Show }) => {
  return (
    <div className="flex flex-row overflow-hidden cursor-pointer gap-[14px] w-[344px] h-[184px] rounded-[10px] border-[0.5px] border-black">
      <div className="relative w-[128px] h-[184px] overflow-hidden rounded-[10px]">
        {show.isLive && (
          <div className="flex items-center justify-center rounded-[20px] z-30 text-center absolute top-[5px] left-[5px] w-[42px] h-[23px] bg-primary-40 text-gray-0 text-xs font-medium rounded-5">
            공연중
          </div>
        )}

        {/* 이미지 */}
        <Link href={show.link}>
          <Image
            src={show.image}
            alt={show.title}
            layout="fill"
            objectFit="cover"
            className="rounded-[10px]"
          />
        </Link>
      </div>

      {/* 텍스트 정보 */}
      <div className="flex flex-col w-[200px] justify-center gap-[5px]">
        <p className="text-left font-pretendard text-base font-semibold text-gray-90">
          {show.title}
        </p>
        <p className="text-left text-sm font-pretendard font-normal text-gray-40">
          {show.description}
        </p>
      </div>
    </div>
  );
};

export default WidePlaylistItem;
