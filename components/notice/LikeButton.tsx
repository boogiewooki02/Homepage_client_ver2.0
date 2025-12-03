import Image from 'next/image';
import { useEffect, useState } from 'react';

import { authInstance } from '@/api/auth/axios';
import EmptyHeart from '@/public/image/notice/EmptyHeart.svg';
import FullHeart from '@/public/image/notice/FullHeart.svg';

interface LikeButtonProps {
  postId: number;
  initialCount: number;
  initialIsLiked?: boolean;
}

const LikeButton = ({
  postId,
  initialCount,
  initialIsLiked = false,
}: LikeButtonProps) => {
  const [isFilled, setIsFilled] = useState(initialIsLiked);
  const [heartCount, setHeartCount] = useState(initialCount);

  useEffect(() => {
    setHeartCount(initialCount);
    setIsFilled(initialIsLiked);
  }, [initialCount, initialIsLiked]);

  const handleToggle = async () => {
    try {
      const response = await authInstance.post(`/post/${postId}/create_like`, {
        isLiked: !isFilled,
      });

      if (response.status === 200) {
        setIsFilled(!isFilled);
        setHeartCount((prev) => (!isFilled ? prev + 1 : prev - 1));
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
