import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import FullHeart from '@/public/image/notice/FullHeart.svg';
import EmptyHeart from '@/public/image/notice/EmptyHeart.svg';
import { axiosInstance } from '@/api/auth/axios';

interface LikeButtonProps {
  postId: number;
  initialCount: number;
  initialIsLiked?: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId, initialCount }) => {
  const [isFilled, setIsFilled] = useState(false);
  const [heartCount, setHeartCount] = useState(initialCount);

  useEffect(() => {
    setHeartCount(initialCount); // 좋아요 수가 변경될 때마다 초기화
  }, [initialCount]);

  const handleToggle = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axiosInstance.post(
        `/post/${postId}/create_like`,
        {
          isLiked: !isFilled,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setIsFilled((prev) => !prev);
        setHeartCount((prev) => (isFilled ? prev - 1 : prev + 1));
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <button
      className="flex items-center gap-2 cursor-pointer"
      onClick={handleToggle}
    >
      <Image
        src={isFilled ? FullHeart : EmptyHeart}
        alt="Heart Icon"
        width={14}
        height={14}
      />
      <span>{heartCount}</span>
    </button>
  );
};

export default LikeButton;
