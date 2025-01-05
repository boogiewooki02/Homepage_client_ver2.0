'use client';

import { useEffect, useState } from 'react';
import { Toggle } from '@/components/announcement/list/Toggle';
import {
  AnnouncementProps,
  CommunityProps,
  toggleList,
} from '@/components/announcement/list/dto';
import Pagination from '@/components/announcement/list/Pagination';
import { authInstance } from '@/api/auth/axios';
import { DetailList } from '@/components/announcement/list/DetailList';

const List = () => {
  const [toggle, setToggle] = useState(toggleList[0].toggle);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pageGroup, setPageGroup] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filteredData, setFilteredData] = useState<
    (AnnouncementProps | CommunityProps)[]
  >([]);

  const fetchListData = async () => {
    const postType = toggle === toggleList[0].toggle ? 'NOTICE' : 'KAHLUA_TIME';

    try {
      const response = await authInstance.get('/post/list', {
        params: {
          post_type: postType,
          page: currentPage - 1, // 0부터 시작
          size: itemsPerPage,
        },
      });

      const { content, totalPages } = response.data.result;

      // 댓글 개수 추가
      const updatedContent = await Promise.all(
        content.map(async (post: AnnouncementProps | CommunityProps) => {
          try {
            const commentResponse = await authInstance.get(
              `/comment/${post.id}/list`
            );
            return {
              ...post,
              comments_count: commentResponse.data.result.comments_count ?? 0,
            };
          } catch (error) {
            console.error(`댓글 개수 로드 실패 (postId: ${post.id}):`, error);
            return { ...post, comments_count: 0 }; // 기본값
          }
        })
      );

      // 최신순 정렬 (id를 기준으로 내림차순 정렬)
      const sortedContent = updatedContent.sort((a, b) => b.id - a.id);

      setFilteredData(sortedContent);
      setTotalPages(totalPages);

      // 검색 필터 적용
      const filtered = sortedContent.filter((post: any) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setFilteredData(filtered);
      setTotalPages(totalPages);
    } catch (error) {
      console.error('게시글 리스트 로드 실패:', error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevGroup = () => {
    if (pageGroup > 0) {
      setPageGroup(pageGroup - 1);
      setCurrentPage((pageGroup - 1) * 5 + 1);
    }
  };

  const handleNextGroup = () => {
    if ((pageGroup + 1) * 5 < totalPages) {
      setPageGroup(pageGroup + 1);
      setCurrentPage((pageGroup + 1) * 5 + 1);
    }
  };

  // 반응형 처리
  useEffect(() => {
    const handleResize = () => {
      const newItemsPerPage = window.innerWidth >= 768 ? 10 : 5;
      setItemsPerPage(newItemsPerPage);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 토글이나 검색 쿼리가 바뀔 때 데이터 초기화
  useEffect(() => {
    setSearchQuery('');
    setCurrentPage(1);
    setPageGroup(0);
  }, [toggle]);

  // API 요청 트리거
  useEffect(() => {
    fetchListData();
  }, [currentPage, itemsPerPage, toggle, searchQuery]);

  return (
    <div className="flex flex-col mt-10 mx-4 pad:mx-auto pad:w-[786px] dt:w-[1200px]">
      {/* 토글 */}
      <Toggle
        toggle={toggle}
        onToggleChange={setToggle}
        searchQuery={searchQuery}
        onSearchChange={(query) => {
          setSearchQuery(query);
          setCurrentPage(1);
        }}
      />

      {/* 리스트 */}
      <section className="flex flex-col border-t-[1px] border-t-black border-b-[1px] border-b-black">
        {toggle === toggleList[0].toggle && <DetailList data={filteredData} />}
        {toggle === toggleList[1].toggle && <DetailList data={filteredData} />}
      </section>

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageGroup={pageGroup}
        pagesPerGroup={5}
        onPageChange={handlePageChange}
        onPrevGroup={handlePrevGroup}
        onNextGroup={handleNextGroup}
      />
    </div>
  );
};

export default List;
