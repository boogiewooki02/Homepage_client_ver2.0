'use client';

import { useEffect, useState } from 'react';
import { Toggle } from '@/components/announcement/list/Toggle';
import {
  AnnouncementProps,
  CommunityProps,
  toggleList,
} from '@/components/announcement/list/dto';
import Pagination from '@/components/announcement/list/Pagination';
import { DetailList } from '@/components/announcement/list/DetailList';

import { useDebounce } from '@/hooks/useDebounce';
import { fetchPostComments, fetchPostList } from '@/api/kahlua/post';

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

  const debouncedSearch = useDebounce(searchQuery, 500);

  const fetchListData = async () => {
    const postType = toggle === toggleList[0].toggle ? 'NOTICE' : 'KAHLUA_TIME';

    try {
      const { content, totalPages } = await fetchPostList({
        postType,
        page: currentPage - 1,
        size: itemsPerPage,
        searchWord: debouncedSearch,
      });

      const updatedContent = await Promise.all(
        content.map(async (post: AnnouncementProps | CommunityProps) => {
          try {
            const comments = await fetchPostComments(post.id);
            return { ...post, comments };
          } catch {
            return { ...post, comments: [] };
          }
        })
      );

      setFilteredData(updatedContent);
      setTotalPages(totalPages);
    } catch (err) {
      console.error('게시글 리스트 로드 실패:', err);
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

  useEffect(() => {
    const handleResize = () => {
      const newItemsPerPage = window.innerWidth >= 834 ? 10 : 5;
      const newPagesPerGroup = window.innerWidth >= 834 ? 10 : 5;

      const currentItemIndex = (currentPage - 1) * itemsPerPage;
      const newPage = Math.floor(currentItemIndex / newItemsPerPage) + 1;
      const newPageGroup = Math.floor((newPage - 1) / newPagesPerGroup);

      // 상태 실제로 바뀔 때만 업데이트
      setItemsPerPage((prev) =>
        prev !== newItemsPerPage ? newItemsPerPage : prev
      );
      setPageGroup((prev) => (prev !== newPageGroup ? newPageGroup : prev));
      setCurrentPage((prev) => (prev !== newPage ? newPage : prev));
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // mount 시 1회 실행

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
  }, [currentPage, itemsPerPage, toggle, debouncedSearch]);

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
