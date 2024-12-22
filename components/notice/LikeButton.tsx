import React, { useState } from 'react';
import Image from 'next/image';
import FullHeart from '@/public/image/notice/FullHeart.svg';
import EmptyHeart from '@/public/image/notice/EmptyHeart.svg';
import { axiosInstance } from '@/api/auth/axios';

interface LikeButtonProps {
  postId: number;
  initialCount?: number;
  initialIsLiked?: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  postId,
  initialCount = 0,
  initialIsLiked = false,
}) => {
  const [isFilled, setIsFilled] = useState(false);
  const [heartCount, setHeartCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.post(`/post/${postId}/create_like`, {
        isLiked: !isFilled,
      });

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
      disabled={loading}
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
