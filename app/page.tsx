'use client';
import About from '@/components/main/About';
import Performance from '@/components/main/Performance';
import Recruit from '@/components/main/Recruit';
import Ticket from '@/components/main/Ticket';

export default function Home() {
  return (
    <div className="font-pretendard flex flex-col relative top-16 w-full h-auto justify-start items-center pad:mt-[32px] -mb-40">
      <div className="flex flex-col w-full h-auto justify-start items-center">
        <About />
        <Performance />
        {/* <Ticket /> */}
      </div>

      {/* 배경색 변경*/}
      <p className="flex w-full h-[120px] bg-gradient-to-b from-gray-0 to-gray-90 " />

      <div className="flex flex-col w-full h-auto justify-start items-center max-pad:px-[16px] bg-gray-90 bg-notice">
        <Recruit />
      </div>
    </div>
  );
}
