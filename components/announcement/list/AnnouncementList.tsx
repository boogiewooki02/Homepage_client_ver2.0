'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { axiosInstance } from '@/api/auth/axios';
import { formatDate } from '@/components/util/formatDate';
import { AnnouncementProps } from '@/components/announcement/list/dto';
import likeIcon from '@/public/image/grayHeart.svg';
import chatIcon from '@/public/image/grayChat.svg';

export const AnnouncementList = ({
  currentPage,
  itemsPerPage,
}: {
  currentPage: number;
  itemsPerPage: number;
}) => {
  const [announcements, setAnnouncements] = useState<AnnouncementProps[]>([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axiosInstance.get('/v1/post/list', {
          params: {
            post_type: 'NOTICE',
            page: currentPage,
            size: itemsPerPage,
          },
        });
        const { content } = response.data.result;

        // 각 공지사항의 댓글 개수까지 업데이트된 content
        const updatedContent = await Promise.all(
          content.map(async (post: AnnouncementProps) => {
            try {
              const commentResponse = await axiosInstance.get(
                `/v1/comment/${post.id}/list`
              );
              return {
                ...post,
                comments_count: commentResponse.data.result.comments_count,
              };
            } catch (error) {
              console.error(`댓글 개수 로드 실패 (postId: ${post.id}):`, error);
              return { ...post, comments_count: 0 }; // 댓글 로드 실패 시 기본값: 0
            }
          })
        );

        setAnnouncements(updatedContent);
      } catch (error) {
        console.error('공지사항 리스트 로드 실패:', error);
      }
    };

    fetchAnnouncements();
  }, [currentPage, itemsPerPage]);

  return (
    <div>
      <ul>
        {announcements.map((post) => (
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
              <p>{formatDate(post.created_at)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
