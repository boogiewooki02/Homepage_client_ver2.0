import { StaticImageData } from 'next/image';
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

interface song {
  id: number;
  year: number;
  url: string;
  src: StaticImageData;
  name: string;
  description: string;
}

const SongList: song[] = [
  {
    id: 0,
    year: 2024,
    url: 'https://www.youtube.com/playlist?list=PLLmJk1z9LuusmjesBNrHElEHmLon5k-0C&si=6RIEOl5EDsSiRiGe',
    src: thumbnail15,
    name: '2024.09.02 정기공연',
    description:
      ' #wave_to_earth #좋지_아니한가 #멸종 #Lacuna #한로로 #Day6 #the_volunteers',
  },
  {
    id: 1,
    year: 2024,
    url: 'https://www.youtube.com/playlist?list=PLLmJk1z9Luut6RrZvInAnzspEsL2JG2S9',
    src: thumbnail0,
    name: '2024.03.04 정기공연',
    description:
      ' #행복했던_날들이었다 #검정치마 #터치드 #알루미늄 #Green_Day #데이브레이크',
  },
  {
    id: 2,
    year: 2023,
    url: 'https://www.youtube.com/playlist?list=PLLmJk1z9LuuuqqH-qjH3ERD37qNJOcbpl',
    src: thumbnail1,
    name: '2023.09.01 정기공연',
    description: ' #그대에게 #LUCY #직감 #실리카겔 #멋진헛간 remix #Lacuna',
  },
  {
    id: 3,
    year: 2023,
    url: 'https://www.youtube.com/playlist?list=PLLmJk1z9LuuuvOWc_mlR5d5eC3EnYZPiH',
    src: thumbnail2,
    name: '2023.03.06 정기공연',
    description:
      ' #스물다섯_스물하나 #데이식스 #잔나비 #YB밴드 #백예린 #미도와_파라솔',
  },
  {
    id: 4,
    year: 2023,
    url: 'https://www.youtube.com/playlist?list=PLLmJk1z9Luus1TGr0V9kNhXqSRJJbJkTW',
    src: thumbnail3,
    name: '2023.01.28 새해맞이 공연',
    description:
      " #Last_Christmas #너드커넥션 #쏜애플 #Can't_take_my_eyes_off_you #Radiohead",
  },
  {
    id: 5,
    year: 2022,
    url: 'https://www.youtube.com/playlist?list=PLLmJk1z9Luusvf1KLF90v1FQBAOejv8_g',
    src: thumbnail4,
    name: '2022.09.01 정기공연',
    description:
      ' #The_Volunteers #사건의_지평선 #(여자)-아이들 #Sk8er_Boy #Muse',
  },
  {
    id: 6,
    year: 2022,
    url: 'https://www.youtube.com/playlist?list=PLLmJk1z9LuutWQhQJW-c1j1_rkFdwsRYt',
    src: thumbnail5,
    name: '2022.03.07 정기공연',
    description: ' #윤하 #Reality #새소년 #Champagne_Supernova #비와_당신',
  },
  {
    id: 7,
    year: 2019,
    url: 'https://www.youtube.com/playlist?list=PLLmJk1z9Luuuq168b0ZO6X0bE5p5W8LbX',
    src: thumbnail6,
    name: '2019.09 정기공연',
    description:
      ' #박하사탕 #Basket_Case #크라잉넛 #Wake_Up_When_September_Ends',
  },
  {
    id: 8,
    year: 2019,
    url: 'https://www.youtube.com/playlist?list=PLLmJk1z9Luusva097pGe_sxwVQ5LwBeLN',
    src: thumbnail7,
    name: '2019.06 깔루아&고스락 연합공연',
    description: ' #그의_바다 #아이유 #This_Love #로맨틱펀치 #Triptych',
  },
  {
    id: 9,
    year: 2019,
    url: 'https://www.youtube.com/playlist?list=PLLmJk1z9LuutTG8UD9hNIWbv_F3JotPS-',
    src: thumbnail8,
    name: '2019.03 정기공연',
    description:
      ' #나에게로_떠나는_여행 #Hysteria #브로큰발렌타인 #Time_Is_Running_Out',
  },
  {
    id: 10,
    year: 2018,
    url: 'https://www.youtube.com/playlist?list=PLLmJk1z9LuuvV3XHuq5t_xgpziwANqfau',
    src: thumbnail9,
    name: '2018.09 정기공연',
    description: " #델리스파이스 #자우림 #Don't_Look_Back_In_Anger #Radiohead",
  },
  {
    id: 11,
    year: 2017,
    url: 'https://www.youtube.com/playlist?list=PLLmJk1z9LuuuIldOPyDdJ-G84HM2zGYR5',
    src: thumbnail10,
    name: '2017.11 문화제',
    description: ' #쏜애플 #시퍼런_봄 #우리의_밤은_당신의_낮보다_아름답다',
  },
  {
    id: 12,
    year: 2017,
    url: 'https://www.youtube.com/playlist?list=PLLmJk1z9LuutEF-XP649aTv4I8xTaaNKd',
    src: thumbnail11,
    name: '2017.09 정기공연',
    description:
      ' #봄이_오면 #빅뱅 #낙화 #뜨거운_여름은_가고_남은_건_볼품없지만',
  },
  {
    id: 13,
    year: 2017,
    url: 'https://www.youtube.com/playlist?list=PLLmJk1z9Luuv5NBskT0N_LHOGiPNET16p',
    src: thumbnail12,
    name: '2017.05 공학인의 밤',
    description: ' #장기하와_얼굴들 #암실 #살아있는_너의_밤',
  },
  {
    id: 14,
    year: 2017,
    url: 'https://www.youtube.com/playlist?list=PLLmJk1z9LuuuHdbZ3r2wiFAIXYSHmHNBx',
    src: thumbnail13,
    name: '2017.03 정기공연',
    description: ' #Butterfly #아틀란티스_소녀 #Hooka #Almost_is_never_Enough',
  },
  {
    id: 15,
    year: 2016,
    url: 'https://www.youtube.com/playlist?list=PLLmJk1z9LuuuyEwS6WeHKNWWnsAGjwV3c',
    src: thumbnail14,
    name: '2016.09 정기공연',
    description: ' #검정치마 #버스커_버스커 #Starlight #우리_지금_만나',
  },
];

export type { song };
export { SongList };
