'use client';
import React, { useState } from 'react';
import DeletePopup from './DeletePostPopup';
import TitleSection from '@/components/notice/post/TitleSection';
import InfoSection from '@/components/notice/post/InfoSection';
import ContentSection from '@/components/notice/post/ContentSection';
import { authInstance } from '@/api/auth/axios';

interface NoticeData {
  title?: string;
  content?: string;
  writer?: string;
  created_at?: string;
  imageUrls?: string[] | string | null;
  likes: number;
  id: number;
  liked: boolean;
}

interface PostProps {
  noticeData: NoticeData;
  commentCount?: number;
  replyCount?: number;
  postId: number;
  currentUser: string;
}

const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(new Date(dateString))
    .replace(/\.$/, '');
};

const Post: React.FC<PostProps> = ({
  noticeData,
  commentCount = 0,
  replyCount = 0,
  currentUser,
  postId,
}) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const handleDeleteClick = () => setShowDeletePopup(true);
  const handleDeleteCancel = () => setShowDeletePopup(false);

  const handleDeleteConfirm = async () => {
    try {
      await authInstance.delete(`/post/notice/${noticeData.id}/delete`);
      setShowDeletePopup(false);
      window.location.href = '/announcement';
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
      alert('게시글 삭제에 실패했습니다.');
    }
  };

  const imageUrls = Array.isArray(noticeData.imageUrls)
    ? noticeData.imageUrls
    : noticeData.imageUrls?.split(',').map((img) => img.trim()) || [];

  return (
    <div className="w-full">
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-16">
          <TitleSection
            title={noticeData.title || ''}
            user={noticeData.writer || ''}
            date={formatDate(noticeData.created_at)}
            content={noticeData.content || ''}
            imageUrls={imageUrls}
            onDeleteClick={handleDeleteClick}
            currentUser={currentUser}
            postId={postId}
          />
          <div className="w-full border-b border-gray-15" />
          <ContentSection
            text={noticeData.content || ''}
            imageUrls={imageUrls}
          />
        </div>
        <InfoSection
          postId={noticeData.id}
          likes={noticeData.likes}
          liked={noticeData.liked}
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
