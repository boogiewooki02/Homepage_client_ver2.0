'use client';
import Image from 'next/image';
import { formatDate } from '@/components/util/formatDate';
import {
  AnnouncementProps,
  CommunityProps,
} from '@/components/announcement/list/dto';
import likeIcon from '@/public/image/grayHeart.svg';
import chatIcon from '@/public/image/grayChat.svg';
import { useRouter } from 'next/navigation';

export const DetailList = ({
  data,
}: {
  data: (AnnouncementProps | CommunityProps)[];
}) => {
  const router = useRouter();

  const handlePostClick = (postId: number) => {
    router.push(`/announcement/post/${postId}`); // 라우팅 처리
  };

  return (
    <div>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            onClick={() => handlePostClick(post.id)}
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
                  <p>
                    {post.comments_count !== undefined
                      ? post.comments_count
                      : '0'}
                  </p>
                </div>
              </div>
              {/* CommunityProps 전용 */}
              {'writer' in post && <p>{post.writer}</p>}
              <p>{formatDate(post.created_at)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
