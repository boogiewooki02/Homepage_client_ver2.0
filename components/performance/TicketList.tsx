import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

import WidePlaylistItem from '../ticket/WidePlaylistItem';

import { authInstance } from '@/api/auth/axios';

interface Performance {
  ticketInfoId: number;
  title: string;
  content: string;
  posterUrl: string;
  status: 'OPEN' | 'CLOSED';
  youtube_url: string;
  link: string;
}

const TicektList = () => {
  const [data, setData] = useState<Performance[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [hasNext, setHasNext] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchPerformanceData = async () => {
    if (!hasNext || isLoading) return;

    setIsLoading(true);

    try {
      const response = await authInstance.get('/performances', {
        params: {
          cursor: nextCursor !== null ? nextCursor : undefined,
          limit: 8,
        },
      });

      if (response.data.isSuccess) {
        setData((prev) => [...prev, ...response.data.result.performances]);
        setNextCursor(response.data.result.nextcursor);
        setHasNext(response.data.result.hasNext);
      }
    } catch (error) {
      console.error('공연 가져오기 실패: ', error);
    }

    setIsLoading(false);
  };

  const isInitialLoading = isLoading && data.length === 0;

  const observerCallback: IntersectionObserverCallback = useCallback(
    (entries) => {
      if (entries[0].isIntersecting && !isLoading) {
        fetchPerformanceData();
      }
    },
    [isLoading]
  );

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      threshold: 0.5,
    });

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [observerCallback]);

  useEffect(() => {
    fetchPerformanceData();
  }, []);

  // 스켈레톤 컴포넌트
  // 태블릿, 데스크탑용
  const SkeletonCard = () => {
    return (
      <div className="animate-pulse w-[184px] dt:w-[273px]">
        <div className="rounded-lg bg-gray-10 w-full h-[257px] dt:h-[380px]" />
        <div className="mt-3 h-5 bg-gray-10 rounded w-3/4" />
        <div className="mt-2 h-4 bg-gray-10 rounded w-2/3" />
      </div>
    );
  };
  // 모바일용
  const SkeletonWide = () => {
    return (
      <div className="animate-pulse flex flex-row gap-[14px] pr-[14px] w-[344px] h-[184px] rounded-[10px] overflow-hidden">
        <div className="relative w-[128px] h-[184px] bg-gray-10 rounded-l-[10px]" />
        <div className="flex flex-col w-[200px] justify-center gap-[5px] py-4">
          <div className="h-5 bg-gray-10 rounded w-4/5 mb-2" />
          <div className="h-4 bg-gray-10 rounded w-3/4" />
        </div>
      </div>
    );
  };

  return (
    <div className="pad:w-[786px] dt:w-[1200px] h-full grid grid-cols-1 pad:grid-cols-4 pad:gap-x-4 dt:gap-x-9 gap-y-12">
      {isInitialLoading && (
        <>
          {Array.from({ length: 12 }).map((_, idx) => (
            <div key={`desk-skeleton-${idx}`} className="max-[833px]:hidden">
              <SkeletonCard />
            </div>
          ))}
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={`mobile-skeleton-${idx}`}
              className="hidden max-[833px]:block"
            >
              <SkeletonWide />
            </div>
          ))}
        </>
      )}

      {!isInitialLoading &&
        data.map((performance) => (
          <div
            key={performance.ticketInfoId}
            className="max-[833px]:hidden relative block w-[184px] dt:w-[273px]"
          >
            {performance.status === 'OPEN' && (
              <div className="flex items-center justify-center rounded-[20px] z-30 text-center absolute top-[15px] left-[13px] w-[42px] h-[23px] bg-primary-40 text-gray-0 text-xs font-medium">
                예매중
              </div>
            )}
            <Link href={`/ticket/${performance.ticketInfoId}`}>
              <div className="relative w-full h-[257px] dt:h-[380px] rounded-lg overflow-hidden cursor-pointer">
                <Image
                  src={performance.posterUrl}
                  alt={performance.title}
                  fill
                  className="object-cover"
                />
              </div>
            </Link>

            <p className="mt-3 text-left font-pretendard text-base font-semibold text-gray-90">
              {performance.title}
            </p>
            <p className="text-left text-sm font-pretendard font-normal text-gray-40">
              {performance.content}
            </p>
          </div>
        ))}

      {!isInitialLoading &&
        data.map((performance) => (
          <div
            key={performance.ticketInfoId}
            className="hidden max-[833px]:block w-full"
          >
            <WidePlaylistItem
              show={performance}
              id={String(performance.ticketInfoId)}
            />
          </div>
        ))}

      <div ref={observerRef} className="w-full h-10" />
    </div>
  );
};

export default TicektList;
