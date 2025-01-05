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
  const date = new Date(dateString);
  return `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}. ${String(date.getDate()).padStart(2, '0')}`;
};

const Post: React.FC<PostProps> = ({
  noticeData,
  commentCount = 0,
  replyCount = 0,
  currentUser,
}) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const handleDeleteClick = () => {
    setShowDeletePopup(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await authInstance.delete(`/post/notice/${noticeData.id}/delete`);
      alert('게시글이 삭제되었습니다.');
      setShowDeletePopup(false);
      window.location.href = '/announcement';
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
      alert('게시글 삭제에 실패했습니다.');
    }
  };

  const handleDeleteCancel = () => {
    setShowDeletePopup(false);
  };

  const imageUrls =
    typeof noticeData.imageUrls === 'string'
      ? noticeData.imageUrls.split(',').map((img) => img.trim())
      : Array.isArray(noticeData.imageUrls)
        ? noticeData.imageUrls
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
            currentUser={currentUser}
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
          liked={noticeData.liked}
          commentCount={commentCount}
          replyCount={replyCount}
        />
      </div>

      {showDeletePopup && (
        <DeletePopup
          isOpen={showDeletePopup}
          onConfirm={handleDeleteConfirm} // ✅ API 요청 포함
          onClose={handleDeleteCancel}
        />
      )}
    </div>
  );
};

export default Post;
