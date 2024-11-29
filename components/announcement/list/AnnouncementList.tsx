import Image from 'next/image';
import { formatDate } from '@/components/util/formatDate';
import { dummyAnnouncement } from '@/components/announcement/list/dummy';
import likeIcon from '@/public/image/grayHeart.svg';
import chatIcon from '@/public/image/grayChat.svg';
import { AnnouncementProps } from '@/components/announcement/list/dto';

export const AnnouncementList = ({
  items,
  currentPage,
  itemsPerPage,
}: {
  items: AnnouncementProps[];
  currentPage: number;
  itemsPerPage: number;
}) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <ul>
        {currentItems.map((post, index) => (
          <li
            key={index}
            className="flex flex-col pad:flex-row py-6 items-start gap-4 self-stretch relative border-y-[1px] border-y-solid border-y-gray-10 justify-between"
          >
            <p className="text-[20px] leading-6 cursor-pointer">{post.title}</p>
            <div className="flex gap-6 pad:gap-10 text-gray-40">
              <div className="flex gap-3 pad:gap-6">
                <div className="flex gap-[10px]">
                  <Image src={likeIcon} alt="like" width={14} height={14} />
                  <p>{post.like}</p>
                </div>
                <div className="flex gap-[10px]">
                  <Image src={chatIcon} alt="chat" width={18} height={18} />
                  <p>{post.comment}</p>
                </div>
              </div>
              <p>{formatDate(post.date)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
