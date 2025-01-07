import { useEffect, useState } from 'react';
import { authInstance } from '@/api/auth/axios';
import likeIcon from '@/public/image/mypage/grayHeart.svg';
import chatIcon from '@/public/image/mypage/grayChat.svg';
import Image from 'next/image';

interface myPostProps {
  id: number;
  title: string;
  content: string;
  writer: string;
  likes: number;
  commentsCount: number;
  imageUrls: string;
  created_at: string;
  updated_at: string;
  liked: boolean;
}

// 내가 쓴 글 리스트
const MyPostsList = () => {
  const [posts, setPosts] = useState<myPostProps[]>([]);

  const getPostList = async () => {
    try {
      const response = await authInstance.get(
        '/my-page/post/list?page=0&size=10&sort=string'
      );
      setPosts(response.data.result.content);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPostList();
  }, []);

  return (
    <div>
      <ul>
        {posts.map((post) => {
          return (
            // li 태그 스타일 코드는 그대로 쓰셔도 됩니다.
            <li
              key={post.id}
              className="flex flex-col pad:flex-row py-6 items-start gap-4 self-stretch relative border-y-[1px] border-y-solid border-y-gray-10 justify-between"
            >
              <p className="text-[20px] leading-6">{post.title}</p>

              <div className="flex gap-10 text-gray-40">
                <div className="flex gap-6">
                  <div className="flex gap-[10px]">
                    <Image src={likeIcon} alt="like" width={14} height={14} />
                    <p>{post.likes}</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <Image src={chatIcon} alt="chat" width={18} height={18} />
                    <p>{post.commentsCount}</p>
                  </div>
                </div>
                <p>{post.created_at}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MyPostsList;
