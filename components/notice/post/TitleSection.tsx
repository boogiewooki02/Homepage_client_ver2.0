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
  onDeleteClick: () => void;
}

const TitleSection: React.FC<TitleSectionProps> = ({
  title = 'No Title',
  user = 'Unknown',
  date = 'Unknown',
  content = 'No Content',
  imageUrls = '',
  currentUser,
  onDeleteClick,
  postId,
}) => {
  const isAuthor = currentUser === user;

  return (
    <div className="flex mt-8">
      <Image
        src={defaultImg}
        alt="default-profile"
        width={88}
        height={88}
        className="dt:flex pad:flex ph:hidden"
      />
      <div className="w-full flex flex-col dt:ml-[24px] pad:ml-[24px] ph:ml-0">
        <span className="font-pretendard text-[32px] font-semibold">
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
