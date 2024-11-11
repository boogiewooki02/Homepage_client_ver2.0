// InfoSection.tsx
import React, { useState } from 'react';
import chat from '@/public/image/notice/chat.svg';
import LikeButton from '@/components/notice/LikeButton';
import Image from 'next/image';

interface InfoSectionProps {
  commentCount: number;
  replyCount: number;
}
const InfoSection: React.FC<InfoSectionProps> = ({
  commentCount,
  replyCount,
}) => {
  const totalChatCount = commentCount + replyCount;
  return (
    <div className="flex flex-col my-10">
      <div className="flex items-center">
        <LikeButton initialCount={0} />
        <div className="flex items-center ml-[24px]">
          <Image src={chat} alt="chat" width={18} height={18} />
          <span className="ml-[10px] font-pretendard text-base">
            {totalChatCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
