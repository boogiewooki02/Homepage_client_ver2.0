'use client';
import React, { useState } from 'react';
import DeletePopup from './DeletePostPopup';
import TitleSection from '@/components/notice/post/TitleSection';
import InfoSection from '@/components/notice/post/InfoSection';
import ContentSection from '@/components/notice/post/ContentSection';

interface NoticeData {
  title?: string;
  content?: string;
  writer?: string;
  created_at?: string;
  imageUrls?: string[] | string | null;
  likes: number;
  id: number;
}
interface PostProps {
  noticeData: NoticeData;
  commentCount: number;
  replyCount: number;
  postId: number;
}

const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}. ${month}. ${day}`;
};

const Post: React.FC<PostProps> = ({
  noticeData,
  commentCount,
  replyCount,
}) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const handleDeleteClick = () => {
    setShowDeletePopup(true);
  };

  const handleDeleteConfirm = () => {
    // 글 삭제
    setShowDeletePopup(false);
  };

  const handleDeleteCancel = () => {
    // 글 삭제 취소
    setShowDeletePopup(false);
  };

  const imageUrls = noticeData?.imageUrls
    ? Array.isArray(noticeData?.imageUrls)
      ? noticeData?.imageUrls // 배열이면 그대로
      : typeof noticeData?.imageUrls === 'string'
        ? noticeData?.imageUrls.split(',').map((img) => img.trim()) // 문자열일 경우 , 기준으로 나누어 배열로 변환
        : [] // null이나 undefined일 경우 빈 배열
    : [];

  const formattedDate = formatDate(noticeData.created_at);

  return (
    <div className="w-full">
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-16">
          <TitleSection
            title={noticeData?.title || ''}
            user={noticeData?.writer || ''}
            date={formattedDate}
            content={noticeData?.content || ''}
            imageUrls={imageUrls}
            onDeleteClick={handleDeleteClick}
          />
          <div className="w-full border-b border-gray-15" />
          <ContentSection
            text={noticeData?.content || ''}
            imageUrls={imageUrls}
          />
        </div>
        <InfoSection
          postId={noticeData.id}
          likes={noticeData.likes}
          commentCount={commentCount}
          replyCount={replyCount}
        />
      </div>

      {showDeletePopup && (
        <DeletePopup
          isOpen={showDeletePopup}
          onConfirm={handleDeleteConfirm}
          onClose={handleDeleteCancel}
        />
      )}
    </div>
  );
};

export default Post;
