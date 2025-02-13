import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RecommendData } from '../data/RecommendData';

const DesktopTicketList = () => {
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 834) {
        setVisibleCount(3);
      } else if (window.innerWidth < 1500) {
        setVisibleCount(4);
      } else {
        setVisibleCount(6);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);

    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);
  return (
    <div className="items-center mt-[21px] grid dt:grid-cols-6 pad:grid-cols-4 ph:grid-cols-1 gap-[17px]">
      {RecommendData.slice(0, visibleCount).map((show, index) => (
        <div key={index} className="relative block w-[184px]">
          {show.isLive && (
            <div className="flex items-center justify-center rounded-[20px] z-30 text-center absolute top-[15px] left-[13px] w-[42px] h-[23px] bg-primary-40 text-gray-0 text-xs font-medium rounded-5">
              공연중
            </div>
          )}
          <Link href={show.link} className="block">
            <div className="relative w-[184px] h-[257px] rounded-lg overflow-hidden cursor-pointer">
              <Image
                src={show.image}
                alt={show.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </Link>
          <p className="mt-3 text-left font-pretendard text-base font-semibold text-gray-90">
            {show.title}
          </p>
          <p className="text-left text-sm font-pretendard font-normal text-gray-40">
            {show.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DesktopTicketList;
