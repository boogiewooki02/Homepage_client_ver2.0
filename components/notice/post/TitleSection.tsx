import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import defaultImg from '@/public/image/notice/defaultProfile.svg';

interface TitleSectionProps {
  title?: string;
  user?: string;
  date?: string;
  content?: string;
  imageUrls?: string[] | string | null;
  currentUser?: string;
  postId?: number;
  profileImageUrl?: string;
  onDeleteClick: () => void;
}

const TitleSection = ({
  title = 'No Title',
  user = 'Unknown',
  date = 'Unknown',
  content = 'No Content',
  imageUrls = '',
  profileImageUrl = '',
  currentUser,
  onDeleteClick,
  postId,
}: TitleSectionProps) => {
  const isAuthor = currentUser === user;

  return (
    <div className="w-full flex mt-8">
      <Image
        src={profileImageUrl || defaultImg}
        alt="default-profile"
        width={88}
        height={88}
        className="dt:flex pad:flex ph:hidden rounded-full object-cover object-center h-[88px] w-[88px]"
      />
      <div className="w-full flex flex-col dt:ml-[24px] pad:ml-[24px] ph:ml-0  dt:max-w-[calc(100%-88px-24px)] pad:max-w-[calc(100%-88px-24px)] ph:max-w-full">
        <span className="w-full font-pretendard text-[32px] font-semibold break-words">
          {title}
        </span>
        <span className="w-full flex flex-row mt-[16px] items-center justify-between">
          <div className="flex flex-row gap-2">
            <span className="font-pretendard text-base font-medium flex">
              {user}
            </span>
            <div className="border-l border-black h-[24px]" />
            <span className="font-pretendard text-base font-medium flex">
              {date}
            </span>
          </div>

          {isAuthor && (
            <div className="flex gap-4">
              <Link
                href={{
                  pathname: '/announcement/posting',
                  query: { postId, title, content, imageUrls },
                }}
                passHref
              >
                <span className="font-pretendard text-base font-normal cursor-pointer">
                  수정
                </span>
              </Link>

              <span
                className="font-pretendard text-base text-danger-50 font-normal cursor-pointer"
                onClick={onDeleteClick}
              >
                삭제
              </span>
            </div>
          )}
        </span>
      </div>
    </div>
  );
};

export default TitleSection;
