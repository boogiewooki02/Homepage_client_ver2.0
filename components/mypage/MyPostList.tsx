import { useState, useEffect } from 'react';
import Image from 'next/image';
import likeIcon from '@/public/image/mypage/grayHeart.svg';
import chatIcon from '@/public/image/mypage/grayChat.svg';
import Pagination from '@/components/announcement/list/Pagination';

interface myPostProps {
  title: string;
  like: number;
  comment: number;
  date: string;
}

// dummy data
const dummyMyPost: myPostProps[] = [
  {
    title: '제목1제목1제목1제목1제목1제목1제목1',
    like: 10,
    comment: 5,
    date: '2024.10.30',
  },
  {
    title: '제목2',
    like: 20,
    comment: 3,
    date: '2024.10.31',
  },
  {
    title: '제목3',
    like: 30,
    comment: 2,
    date: '2024.11.01',
  },
  {
    title: '제목4',
    like: 40,
    comment: 1,
    date: '2024.11.02',
  },
  {
    title: '제목1제목1제목1제목1제목1제목1제목1',
    like: 10,
    comment: 5,
    date: '2024.10.30',
  },
  {
    title: '제목2',
    like: 20,
    comment: 3,
    date: '2024.10.31',
  },
  {
    title: '제목3',
    like: 30,
    comment: 2,
    date: '2024.11.01',
  },
  {
    title: '제목4',
    like: 40,
    comment: 1,
    date: '2024.11.02',
  },
];

// 내가 쓴 글 리스트
export const MyPostList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pageGroup, setPageGroup] = useState(0);

  const totalItems = dummyMyPost.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pagesPerGroup = 5;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevGroup = () => {
    if (pageGroup > 0) {
      setPageGroup(pageGroup - 1);
      setCurrentPage((pageGroup - 1) * pagesPerGroup + 1); // 이전 그룹의 첫 페이지로 이동
    }
  };

  const handleNextGroup = () => {
    if ((pageGroup + 1) * pagesPerGroup < totalPages) {
      setPageGroup(pageGroup + 1);
      setCurrentPage((pageGroup + 1) * pagesPerGroup + 1); // 다음 그룹의 첫 페이지로 이동
    }
  };

  // 현재 페이지에 해당하는 데이터 계산
  const paginatedItems = dummyMyPost.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    // 반응형 - 페이지 내에서 보이는 게시글 개수 조절
    const handleResize = () => {
      const newItemsPerPage = window.innerWidth >= 768 ? 10 : 5;

      // 현재 페이지에 표시되는 첫 아이템의 인덱스를 기반으로 새로운 페이지 번호 계산
      const currentItemIndex = (currentPage - 1) * itemsPerPage;
      const newPage = Math.floor(currentItemIndex / newItemsPerPage) + 1;

      setItemsPerPage(newItemsPerPage);
      setCurrentPage(newPage);
      setPageGroup(Math.floor((newPage - 1) / pagesPerGroup)); // 페이지 그룹 재설정
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [currentPage, itemsPerPage]);

  return (
    <div>
      <ul>
        {paginatedItems.map((post) => {
          return (
            <li
              key={post.title + post.date}
              className="flex flex-col pad:flex-row py-6 items-start gap-4 self-stretch relative border-y-[1px] border-y-solid border-y-gray-10 justify-between"
            >
              <p className="text-[20px] leading-6">{post.title}</p>

              <div className="flex gap-10 text-gray-40">
                <div className="flex gap-6">
                  <div className="flex gap-[10px]">
                    <Image src={likeIcon} alt="like" width={14} height={14} />
                    <p>{post.like}</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <Image src={chatIcon} alt="chat" width={18} height={18} />
                    <p>{post.comment}</p>
                  </div>
                </div>
                <p>{post.date}</p>
              </div>
            </li>
          );
        })}
      </ul>
      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageGroup={pageGroup}
        pagesPerGroup={pagesPerGroup}
        onPageChange={handlePageChange}
        onPrevGroup={handlePrevGroup}
        onNextGroup={handleNextGroup}
      />
    </div>
  );
};
