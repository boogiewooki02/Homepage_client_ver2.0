import { useState, useEffect } from 'react';
import Image from 'next/image';
import { shuffleArray } from '@/utils/shuffleArrayUtils';
import Link from 'next/link';

const DesktopTicketList = ({
  tickets,
  currentId,
}: {
  tickets: any[];
  currentId: number;
}) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [shuffledTickets, setShuffledTickets] = useState<any[] | null>(null);

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

  useEffect(() => {
    if (!tickets.length) return;
    const filteredTickets = tickets.filter(
      (show) => show.ticketInfoId !== currentId
    );
    const randomizedTickets = shuffleArray(filteredTickets);

    setShuffledTickets(randomizedTickets);
  }, [tickets, currentId]);

  if (!shuffledTickets) {
    return <div className="text-center mt-4" />;
  }

  return (
    <div className="mt-[21px] grid dt:grid-cols-6 pad:grid-cols-4 ph:grid-cols-1 gap-[17px]">
      {shuffledTickets.slice(0, visibleCount).map((show) => (
        <div key={show.ticketInfoId} className="relative w-[184px] block">
          {show.status === 'OPEN' && (
            <div className="flex items-center justify-center rounded-[20px] z-30 text-center absolute top-[15px] left-[13px] w-[42px] h-[23px] bg-primary-40 text-gray-0 text-xs font-medium rounded-5">
              예매중
            </div>
          )}
          <div className="flex items-start relative w-[184px] h-[257px] rounded-lg overflow-hidden cursor-pointer">
            <Link href={`/ticket/${show.ticketInfoId}`}>
              <Image
                src={show.posterUrl}
                alt={show.title}
                layout="fill"
                objectFit="cover"
              />
            </Link>
          </div>
          <p className="mt-3 text-left font-pretendard text-base font-semibold text-gray-90">
            {show.title}
          </p>
          <p className="text-left text-sm font-pretendard font-normal text-gray-40">
            {show.content}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DesktopTicketList;
