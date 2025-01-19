'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { selectedYear } from '@/atoms';
import thumbnail0 from '@/public/image/performance/thumbnails/1.avif';
import thumbnail1 from '@/public/image/performance/thumbnails/2.avif';
import thumbnail2 from '@/public/image/performance/thumbnails/3.avif';
import thumbnail3 from '@/public/image/performance/thumbnails/4.avif';
import thumbnail4 from '@/public/image/performance/thumbnails/5.avif';
import thumbnail5 from '@/public/image/performance/thumbnails/6.avif';
import thumbnail6 from '@/public/image/performance/thumbnails/7.avif';
import thumbnail7 from '@/public/image/performance/thumbnails/8.avif';
import thumbnail8 from '@/public/image/performance/thumbnails/9.avif';
import thumbnail9 from '@/public/image/performance/thumbnails/10.avif';
import thumbnail10 from '@/public/image/performance/thumbnails/11.avif';
import thumbnail11 from '@/public/image/performance/thumbnails/12.avif';
import thumbnail12 from '@/public/image/performance/thumbnails/13.avif';
import thumbnail13 from '@/public/image/performance/thumbnails/14.avif';
import thumbnail14 from '@/public/image/performance/thumbnails/15.avif';
import thumbnail15 from '@/public/image/performance/thumbnails/0.avif';
import chevron_down_blue from '@/public/image/performance/chevron-down-blue.svg';

const detail = [
  {
    year: '2024',
    url: 'https://www.youtube.com/playlist?list=PLLmJk1z9Luut6RrZvInAnzspEsL2JG2S9',
    src: thumbnail0,
    name: '2024.03.04 정기공연',
    description:
      ' #행복했던_날들이었다 #검정치마 #터치드 #알루미늄 #Green_Day #데이브레이크',
  },
  {
    year: '2023',
    url: 'https://www.youtube.com/playlist?list=PLLmJk1z9LuuuqqH-qjH3ERD37qNJOcbpl',
    src: thumbnail1,
    name: '2023.09.01 정기공연',
    description: ' #그대에게 #LUCY #직감 #실리카겔 #멋진헛간 remix #Lacuna',
  },
  {
    year: '2023',
    url: 'https://www.youtube.com/playlist?list=PLLmJk1z9LuuuvOWc_mlR5d5eC3EnYZPiH',
    src: thumbnail2,
    name: '2023.03.06 정기공연',
    description:
      ' #스물다섯_스물하나 #데이식스 #잔나비 #YB밴드 #백예린 #미도와_파라솔',
  },
  {
    year: '2023',
    url: 'https://www.youtube.com/playlist?list=PLLmJk1z9Luus1TGr0V9kNhXqSRJJbJkTW',
    src: thumbnail3,
    name: '2023.01.28 새해맞이 공연',
    description:
      " #Last_Christmas #너드커넥션 #쏜애플 #Can't_take_my_eyes_off_you #Radiohead",
  },
  {
    year: '2022',
    url: 'https://www.youtube.com/playlist?list=PLLmJk1z9Luusvf1KLF90v1FQBAOejv8_g',
    src: thumbnail4,
    name: '2022.09.01 정기공연',
    description:
      ' #The_Volunteers #사건의_지평선 #(여자)-아이들 #Sk8er_Boy #Muse',
  },
  {
    year: '2022',
    url: 'https://www.youtube.com/playlist?list=PLLmJk1z9LuutWQhQJW-c1j1_rkFdwsRYt',
    src: thumbnail5,
    name: '2022.03.07 정기공연',
    description: ' #윤하 #Reality #새소년 #Champagne_Supernova #비와_당신',
  },
  {
    year: '2019',
    url: 'https://www.youtube.com/playlist?list=PLLmJk1z9Luuuq168b0ZO6X0bE5p5W8LbX',
    src: thumbnail6,
    name: '2019.09 정기공연',
    description:
      ' #박하사탕 #Basket_Case #크라잉넛 #Wake_Up_When_September_Ends',
  },
  {
    year: '2019',
    url: 'https://www.youtube.com/playlist?list=PLLmJk1z9Luusva097pGe_sxwVQ5LwBeLN',
    src: thumbnail7,
    name: '2019.06 깔루아&고스락 연합공연',
    description: ' #그의_바다 #아이유 #This_Love #로맨틱펀치 #Triptych',
  },
  {
    year: '2019',
    url: 'https://www.youtube.com/playlist?list=PLLmJk1z9LuutTG8UD9hNIWbv_F3JotPS-',
    src: thumbnail8,
    name: '2019.03 정기공연',
    description:
      ' #나에게로_떠나는_여행 #Hysteria #브로큰발렌타인 #Time_Is_Running_Out',
  },
  {
    year: '2018',
    url: 'https://www.youtube.com/playlist?list=PLLmJk1z9LuuvV3XHuq5t_xgpziwANqfau',
    src: thumbnail9,
    name: '2018.09 정기공연',
    description: " #델리스파이스 #자우림 #Don't_Look_Back_In_Anger #Radiohead",
  },
  {
    year: '2017',
    url: 'https://www.youtube.com/playlist?list=PLLmJk1z9LuuuIldOPyDdJ-G84HM2zGYR5',
    src: thumbnail10,
    name: '2017.11 문화제',
    description: ' #쏜애플 #시퍼런_봄 #우리의_밤은_당신의_낮보다_아름답다',
  },
  {
    year: '2017',
    url: 'https://www.youtube.com/playlist?list=PLLmJk1z9LuutEF-XP649aTv4I8xTaaNKd',
    src: thumbnail11,
    name: '2017.09 정기공연',
    description:
      ' #봄이_오면 #빅뱅 #낙화 #뜨거운_여름은_가고_남은_건_볼품없지만',
  },
  {
    year: '2017',
    url: 'https://www.youtube.com/playlist?list=PLLmJk1z9Luuv5NBskT0N_LHOGiPNET16p',
    src: thumbnail12,
    name: '2017.05 공학인의 밤',
    description: ' #장기하와_얼굴들 #암실 #살아있는_너의_밤',
  },
  {
    year: '2017',
    url: 'https://www.youtube.com/playlist?list=PLLmJk1z9LuuuHdbZ3r2wiFAIXYSHmHNBx',
    src: thumbnail13,
    name: '2017.03 정기공연',
    description: ' #Butterfly #아틀란티스_소녀 #Hooka #Almost_is_never_Enough',
  },
  {
    year: '2016',
    url: 'https://www.youtube.com/playlist?list=PLLmJk1z9LuuuyEwS6WeHKNWWnsAGjwV3c',
    src: thumbnail14,
    name: '2016.09 정기공연',
    description: ' #검정치마 #버스커_버스커 #Starlight #우리_지금_만나',
  },
  {
    year: '2024',
    url: 'https://www.youtube.com/playlist?list=PLLmJk1z9LuusmjesBNrHElEHmLon5k-0C&si=6RIEOl5EDsSiRiGe',
    src: thumbnail15,
    name: '2024.09.02 정기공연',
    description:
      ' #wave_to_earth #좋지_아니한가 #멸종 #Lacuna #한로로 #Day6 #the_volunteers',
  },
];

const Playlists = () => {
  const [showMore, setShowMore] = useState(false);
  const sYear = useRecoilValue(selectedYear);

  const handleMore = () => {
    setShowMore(!showMore);
  };
  useEffect(() => {
    setShowMore(false);
  }, [sYear]);

  return (
    <>
      <div className="pad:max-w-[786px] dt:max-w-[1200px] h-full grid grid-cols-1 pad:grid-cols-3 dt:grid-cols-4 gap-x-6 gap-y-12">
        {(sYear === 'All' || sYear === '2024') && (
          <div className="w-[328px] pad:w-[246px] dt:w-[282px] flex flex-col items-start gap-[8px]">
            <div
              className="cursor-pointer"
              onClick={() => {
                window.open(detail[15].url);
              }}
            >
              <Image
                src={detail[15].src}
                alt="thumbnail"
                quality={50}
                className="rounded-[12px]"
                sizes="100vw"
              />
            </div>
            <p className="text-[20px] font-semibold leading-8">
              {detail[15].name}
            </p>
            <span className="text-[16px] text-gray-40 font-medium leading-6">
              {detail[15].description}
            </span>
          </div>
        )}
        {(sYear === 'All' || sYear === '2024') && (
          <div className="w-[328px] pad:w-[246px] dt:w-[282px] flex flex-col items-start gap-[8px]">
            <div
              className="cursor-pointer"
              onClick={() => {
                window.open(detail[0].url);
              }}
            >
              <Image
                src={detail[0].src}
                alt="thumbnail"
                quality={50}
                className="rounded-[12px]"
                sizes="100vw"
              />
            </div>
            <p className="text-[20px] font-semibold leading-8">
              {detail[0].name}
            </p>
            <span className="text-[16px] text-gray-40 font-medium leading-6">
              {detail[0].description}
            </span>
          </div>
        )}
        {(sYear === 'All' || sYear === '2023') && (
          <div className="w-[328px] pad:w-[246px] dt:w-[282px] flex flex-col items-start gap-[8px]">
            <div
              className="cursor-pointer"
              onClick={() => {
                window.open(detail[1].url);
              }}
            >
              <Image
                src={detail[1].src}
                alt="thumbnail"
                quality={50}
                className="rounded-[12px]"
                sizes="100vw"
              />
            </div>
            <p className="text-[20px] font-semibold leading-8">
              {detail[1].name}
            </p>
            <span className="text-[16px] text-gray-40 font-medium leading-6">
              {detail[1].description}
            </span>
          </div>
        )}
        {(sYear === 'All' || sYear === '2023') && (
          <div className="w-[328px] pad:w-[246px] dt:w-[282px] flex flex-col items-start gap-[8px]">
            <div
              className="cursor-pointer"
              onClick={() => {
                window.open(detail[2].url);
              }}
            >
              <Image
                src={detail[2].src}
                alt="thumbnail"
                quality={50}
                className="rounded-[12px]"
                sizes="100vw"
              />
            </div>
            <p className="text-[20px] font-semibold leading-8">
              {detail[2].name}
            </p>
            <span className="text-[16px] text-gray-40 font-medium leading-6">
              {detail[2].description}
            </span>
          </div>
        )}
        {(sYear === 'All' || sYear === '2023') && (
          <div className="w-[328px] pad:w-[246px] dt:w-[282px] flex flex-col items-start gap-[8px]">
            <div
              className="cursor-pointer"
              onClick={() => {
                window.open(detail[3].url);
              }}
            >
              <Image
                src={detail[3].src}
                alt="thumbnail"
                quality={50}
                className="rounded-[12px]"
                sizes="100vw"
              />
            </div>
            <p className="text-[20px] font-semibold leading-8">
              {detail[3].name}
            </p>
            <span className="text-[16px] text-gray-40 font-medium leading-6">
              {detail[3].description}
            </span>
          </div>
        )}
        {(sYear === 'All' || sYear === '2022') && (
          <div className="w-[328px] pad:w-[246px] dt:w-[282px] flex flex-col items-start gap-[8px]">
            <div
              className="cursor-pointer"
              onClick={() => {
                window.open(detail[4].url);
              }}
            >
              <Image
                src={detail[4].src}
                alt="thumbnail"
                quality={50}
                className="rounded-[12px]"
                sizes="100vw"
              />
            </div>
            <p className="text-[20px] font-semibold leading-8">
              {detail[4].name}
            </p>
            <span className="text-[16px] text-gray-40 font-medium leading-6">
              {detail[4].description}
            </span>
          </div>
        )}
        {(sYear === 'All' || sYear === '2022') && (
          <div className="w-[328px] pad:w-[246px] dt:w-[282px] flex flex-col items-start gap-[8px]">
            <div
              className="cursor-pointer"
              onClick={() => {
                window.open(detail[5].url);
              }}
            >
              <Image
                src={detail[5].src}
                alt="thumbnail"
                quality={50}
                className="rounded-[12px]"
                sizes="100vw"
              />
            </div>
            <p className="text-[20px] font-semibold leading-8">
              {detail[5].name}
            </p>
            <span className="text-[16px] text-gray-40 font-medium leading-6">
              {detail[5].description}
            </span>
          </div>
        )}
        {(sYear === 'All' || sYear === '2019') && (
          <div className="w-[328px] pad:w-[246px] dt:w-[282px] flex flex-col items-start gap-[8px]">
            <div
              className="cursor-pointer"
              onClick={() => {
                window.open(detail[6].url);
              }}
            >
              <Image
                src={detail[6].src}
                alt="thumbnail"
                quality={50}
                className="rounded-[12px]"
                sizes="100vw"
              />
            </div>
            <p className="text-[20px] font-semibold leading-8">
              {detail[6].name}
            </p>
            <span className="text-[16px] text-gray-40 font-medium leading-6">
              {detail[6].description}
            </span>
          </div>
        )}
        {(sYear === 'All' || sYear === '2019') && (
          <div className="w-[328px] pad:w-[246px] dt:w-[282px] flex flex-col items-start gap-[8px]">
            <div
              className="cursor-pointer"
              onClick={() => {
                window.open(detail[7].url);
              }}
            >
              <Image
                src={detail[7].src}
                alt="thumbnail"
                quality={50}
                className="rounded-[12px]"
                sizes="100vw"
              />
            </div>
            <p className="text-[20px] font-semibold leading-8">
              {detail[7].name}
            </p>
            <span className="text-[16px] text-gray-40 font-medium leading-6">
              {detail[7].description}
            </span>
          </div>
        )}
        {(sYear === 'All' || sYear === '2019') && (
          <div className="w-[328px] pad:w-[246px] dt:w-[282px] flex flex-col items-start gap-[8px]">
            <div
              className="cursor-pointer"
              onClick={() => {
                window.open(detail[8].url);
              }}
            >
              <Image
                src={detail[8].src}
                alt="thumbnail"
                quality={50}
                className="rounded-[12px]"
                sizes="100vw"
              />
            </div>
            <p className="text-[20px] font-semibold leading-8">
              {detail[8].name}
            </p>
            <span className="text-[16px] text-gray-40 font-medium leading-6">
              {detail[8].description}
            </span>
          </div>
        )}
        {(sYear === 'All' || sYear === '2018') && (
          <div className="w-[328px] pad:w-[246px] dt:w-[282px] flex flex-col items-start gap-[8px]">
            <div
              className="cursor-pointer"
              onClick={() => {
                window.open(detail[9].url);
              }}
            >
              <Image
                src={detail[9].src}
                alt="thumbnail"
                quality={50}
                className="rounded-[12px]"
                sizes="100vw"
              />
            </div>
            <p className="text-[20px] font-semibold leading-8">
              {detail[9].name}
            </p>
            <span className="text-[16px] text-gray-40 font-medium leading-6">
              {detail[9].description}
            </span>
          </div>
        )}
        {(sYear === 'All' || sYear === '2017') && (
          <div className="w-[328px] pad:w-[246px] dt:w-[282px] flex flex-col items-start gap-[8px]">
            <div
              className="cursor-pointer"
              onClick={() => {
                window.open(detail[10].url);
              }}
            >
              <Image
                src={detail[10].src}
                alt="thumbnail"
                quality={50}
                className="rounded-[12px]"
                sizes="100vw"
              />
            </div>
            <p className="text-[20px] font-semibold leading-8">
              {detail[10].name}
            </p>
            <span className="text-[16px] text-gray-40 font-medium leading-6">
              {detail[10].description}
            </span>
          </div>
        )}
        {/* {(sYear === 'All' || sYear === '2017') && (
          <div className="w-[328px] pad:w-[246px] dt:w-[282px] flex flex-col items-start gap-[8px]">
            <div
              className="cursor-pointer"
              onClick={() => {
                window.open(detail[11].url);
              }}
            >
              <Image
                src={detail[11].src}
                alt="thumbnail"
                quality={50}
                className="rounded-[12px]"
                sizes="100vw"
              />
            </div>
            <p className="text-[20px] font-semibold leading-8">
              {detail[11].name}
            </p>
            <span className="text-[16px] text-gray-40 font-medium leading-6">
              {detail[11].description}
            </span>
          </div>
        )} */}
        {sYear === 'All' && showMore && (
          <div className="w-[328px] pad:w-[246px] dt:w-[282px] flex flex-col items-start gap-[8px]">
            <div
              className="cursor-pointer"
              onClick={() => {
                window.open(detail[11].url);
              }}
            >
              <Image
                src={detail[11].src}
                alt="thumbnail"
                quality={50}
                className="rounded-[12px]"
                sizes="100vw"
              />
            </div>
            <p className="text-[20px] font-semibold leading-8">
              {detail[11].name}
            </p>
            <span className="text-[16px] text-gray-40 font-medium leading-6">
              {detail[11].description}
            </span>
          </div>
        )}
        {sYear === '2017' && (
          <div className="w-[328px] pad:w-[246px] dt:w-[282px] flex flex-col items-start gap-[8px]">
            <div
              className="cursor-pointer"
              onClick={() => {
                window.open(detail[11].url);
              }}
            >
              <Image
                src={detail[11].src}
                alt="thumbnail"
                quality={50}
                className="rounded-[12px]"
                sizes="100vw"
              />
            </div>
            <p className="text-[20px] font-semibold leading-8">
              {detail[11].name}
            </p>
            <span className="text-[16px] text-gray-40 font-medium leading-6">
              {detail[11].description}
            </span>
          </div>
        )}
        {/* {(sYear === 'All' && showMore) ||
          (sYear === '2017' && (
            <div className="w-[328px] pad:w-[246px] dt:w-[282px] flex flex-col items-start gap-[8px]">
              <div
                className="cursor-pointer"
                onClick={() => {
                  window.open(detail[12].url);
                }}
              >
                <Image
                  src={detail[12].src}
                  alt="thumbnail"
                  quality={50}
                  className="rounded-[12px]"
                  sizes="100vw"
                />
              </div>
              <p className="text-[20px] font-semibold leading-8">
                {detail[12].name}
              </p>
              <span className="text-[16px] text-gray-40 font-medium leading-6">
                {detail[12].description}
              </span>
            </div>
          ))} */}
        {sYear === 'All' && showMore && (
          <div className="w-[328px] pad:w-[246px] dt:w-[282px] flex flex-col items-start gap-[8px]">
            <div
              className="cursor-pointer"
              onClick={() => {
                window.open(detail[12].url);
              }}
            >
              <Image
                src={detail[12].src}
                alt="thumbnail"
                quality={50}
                className="rounded-[12px]"
                sizes="100vw"
              />
            </div>
            <p className="text-[20px] font-semibold leading-8">
              {detail[12].name}
            </p>
            <span className="text-[16px] text-gray-40 font-medium leading-6">
              {detail[12].description}
            </span>
          </div>
        )}
        {sYear === '2017' && (
          <div className="w-[328px] pad:w-[246px] dt:w-[282px] flex flex-col items-start gap-[8px]">
            <div
              className="cursor-pointer"
              onClick={() => {
                window.open(detail[12].url);
              }}
            >
              <Image
                src={detail[12].src}
                alt="thumbnail"
                quality={50}
                className="rounded-[12px]"
                sizes="100vw"
              />
            </div>
            <p className="text-[20px] font-semibold leading-8">
              {detail[12].name}
            </p>
            <span className="text-[16px] text-gray-40 font-medium leading-6">
              {detail[12].description}
            </span>
          </div>
        )}
        {/* 같이 적으니 렌더링이 이상해져서 2개로 나눠서 작성했습니다 */}
        {sYear === 'All' && showMore && (
          <div className="w-[328px] pad:w-[246px] dt:w-[282px] flex flex-col items-start gap-[8px]">
            <div
              className="cursor-pointer"
              onClick={() => {
                window.open(detail[13].url);
              }}
            >
              <Image
                src={detail[13].src}
                alt="thumbnail"
                quality={50}
                className="rounded-[12px]"
                sizes="100vw"
              />
            </div>
            <p className="text-[20px] font-semibold leading-8">
              {detail[13].name}
            </p>
            <span className="text-[16px] text-gray-40 font-medium leading-6">
              {detail[13].description}
            </span>
          </div>
        )}
        {sYear === '2017' && (
          <div className="w-[328px] pad:w-[246px] dt:w-[282px] flex flex-col items-start gap-[8px]">
            <div
              className="cursor-pointer"
              onClick={() => {
                window.open(detail[13].url);
              }}
            >
              <Image
                src={detail[13].src}
                alt="thumbnail"
                quality={50}
                className="rounded-[12px]"
                sizes="100vw"
              />
            </div>
            <p className="text-[20px] font-semibold leading-8">
              {detail[13].name}
            </p>
            <span className="text-[16px] text-gray-40 font-medium leading-6">
              {detail[13].description}
            </span>
          </div>
        )}
        {sYear === 'All' && showMore && (
          <div className="w-[328px] pad:w-[246px] dt:w-[282px] flex flex-col items-start gap-[8px]">
            <div
              className="cursor-pointer"
              onClick={() => {
                window.open(detail[14].url);
              }}
            >
              <Image
                src={detail[14].src}
                alt="thumbnail"
                quality={50}
                className="rounded-[12px]"
                sizes="100vw"
              />
            </div>
            <p className="text-[20px] font-semibold leading-8">
              {detail[14].name}
            </p>
            <span className="text-[16px] text-gray-40 font-medium leading-6">
              {detail[14].description}
            </span>
          </div>
        )}
        {sYear === '2016' && (
          <div className="w-[328px] pad:w-[246px] dt:w-[282px] flex flex-col items-start gap-[8px]">
            <div
              className="cursor-pointer"
              onClick={() => {
                window.open(detail[14].url);
              }}
            >
              <Image
                src={detail[14].src}
                alt="thumbnail"
                quality={50}
                className="rounded-[12px]"
                sizes="100vw"
              />
            </div>
            <p className="text-[20px] font-semibold leading-8">
              {detail[14].name}
            </p>
            <span className="text-[16px] text-gray-40 font-medium leading-6">
              {detail[14].description}
            </span>
          </div>
        )}
      </div>
      {/* 더보기 버튼 */}
      {sYear === 'All' && (
        <div onClick={handleMore} className="flex mt-16 gap-2 cursor-pointer">
          {showMore ? (
            <span className="text-primary-50 text-center text-lg font-medium">
              닫기
            </span>
          ) : (
            <span className="text-primary-50 text-center text-lg font-medium">
              더보기
            </span>
          )}
          {showMore ? (
            <Image
              style={{ transform: 'rotate(180deg)' }}
              src={chevron_down_blue}
              alt="more"
              width={16}
              height={16}
            />
          ) : (
            <Image src={chevron_down_blue} alt="more" width={16} height={16} />
          )}
        </div>
      )}
    </>
  );
};

export default Playlists;
