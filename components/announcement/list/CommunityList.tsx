'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { authInstance } from '@/api/auth/axios';
import { formatDate } from '@/components/util/formatDate';
import { CommunityProps } from '@/components/announcement/list/dto';
import likeIcon from '@/public/image/grayHeart.svg';
import chatIcon from '@/public/image/grayChat.svg';

export const CommunityList = ({
  currentPage,
  itemsPerPage,
}: {
  currentPage: number;
  itemsPerPage: number;
}) => {
  const [communityPosts, setCommunityPosts] = useState<CommunityProps[]>([]);

  useEffect(() => {
    const fetchCommunityPosts = async () => {
      try {
        const response = await authInstance.get('/post/list', {
          params: {
            post_type: 'KAHLUA_TIME',
            page: currentPage - 1,
            size: itemsPerPage,
          },
        });

        const { content } = response.data.result;

        // 각 깔깔깔의 댓글 개수까지 업데이트된 content
        const updatedContent = await Promise.all(
          content.map(async (post: CommunityProps) => {
            try {
              const commentResponse = await authInstance.get(
                `/comment/${post.id}/list`
              );
              return {
                ...post,
                comments_count: commentResponse.data.result.comments_count,
              };
            } catch (error) {
              console.error(
                `깔깔깔 댓글 개수 로드 실패 (postId: ${post.id}):`,
                error
              );
              return { ...post, comments_count: 0 }; // 댓글 로드 실패 시 기본값: 0
            }
          })
        );

        setCommunityPosts(updatedContent);
      } catch (error) {
        console.error('깔깔깔 게시글 로드 실패:', error);
      }
    };

    fetchCommunityPosts();
  }, [currentPage, itemsPerPage]);

  return (
    <div>
      <ul>
        {communityPosts.map((post) => (
          <li
            key={post.id}
            className="flex flex-col pad:flex-row py-6 items-start gap-4 self-stretch relative border-y-[1px] border-y-solid border-y-gray-10 justify-between"
          >
            <p className="text-[20px] leading-6 cursor-pointer">{post.title}</p>
            <div className="flex gap-6 pad:gap-10 text-gray-40">
              <div className="flex gap-3 pad:gap-6">
                <div className="flex gap-[10px]">
                  <Image src={likeIcon} alt="like" width={14} height={14} />
                  <p>{post.likes}</p>
                </div>
                <div className="flex gap-[10px]">
                  <Image src={chatIcon} alt="chat" width={18} height={18} />
                  <p>{post.comments_count}</p>
                </div>
              </div>
              <p>{post.writer}</p>
              <p>{formatDate(post.created_at)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
