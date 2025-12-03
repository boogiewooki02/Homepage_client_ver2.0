'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { fetchPostList, searchPosts } from '@/api/kahlua/post';
import { DetailList } from '@/components/announcement/list/DetailList';
import {
  AnnouncementProps,
  CommunityProps,
  toggleList,
} from '@/components/announcement/list/dto';
import Pagination from '@/components/announcement/list/Pagination';
import { Toggle } from '@/components/announcement/list/Toggle';
import { useDebounce } from '@/hooks/useDebounce';
import { normalizePosts } from '@/utils/noticeUtils';

const List = () => {
  const [toggle, setToggle] = useState(toggleList[0].toggle);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 500);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pageGroup, setPageGroup] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [hasNext, setHasNext] = useState<boolean | undefined>(undefined);

  const reqIdRef = useRef(0);
  const [filteredData, setFilteredData] = useState<
    (AnnouncementProps | CommunityProps)[]
  >([]);

  const postType = useMemo(
    () => (toggle === toggleList[0].toggle ? 'NOTICE' : 'KAHLUA_TIME'),
    [toggle]
  );

  const runQuery = async () => {
    const myId = ++reqIdRef.current;
    const page0 = currentPage - 1;
    try {
      const keyword = debouncedSearch.trim();

      const result = keyword
        ? await searchPosts({
            query: keyword,
            postType,
            page: page0,
            size: itemsPerPage,
          })
        : await fetchPostList({
            postType,
            page: page0,
            size: itemsPerPage,
          });

      if (myId !== reqIdRef.current) return;

      setFilteredData(normalizePosts(result.items));
      setTotalPages(result.totalPages ?? 0);
      setHasNext(result.hasNext);
    } catch (err) {
      if (myId !== reqIdRef.current) return;
      console.error('게시글 목록/검색 로드 실패:', err);
    }
  };

  // 트리거: 페이지, 사이즈, 토글, 디바운스 검색어
  useEffect(() => {
    runQuery();
  }, [currentPage, itemsPerPage, postType, debouncedSearch]);

  useEffect(() => {
    setSearchQuery('');
    setCurrentPage(1);
    setPageGroup(0);
  }, [toggle]);

  useEffect(() => {
    const handleResize = () => {
      const newItemsPerPage = window.innerWidth >= 834 ? 10 : 5;
      const newPagesPerGroup = window.innerWidth >= 834 ? 10 : 5;

      const currentItemIndex = (currentPage - 1) * itemsPerPage;
      const newPage = Math.floor(currentItemIndex / newItemsPerPage) + 1;
      const newPageGroup = Math.floor((newPage - 1) / newPagesPerGroup);

      setItemsPerPage((prev) =>
        prev !== newItemsPerPage ? newItemsPerPage : prev
      );
      setPageGroup((prev) => (prev !== newPageGroup ? newPageGroup : prev));
      setCurrentPage((prev) => (prev !== newPage ? newPage : prev));
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // mount 시 1회 실행
    return () => window.removeEventListener('resize', handleResize);
  }, [currentPage, itemsPerPage]);

  const safeTotalPages = useMemo(() => {
    if (totalPages && totalPages > 0) return totalPages;
    if (typeof hasNext === 'boolean') {
      return hasNext ? currentPage + 1 : currentPage;
    }
    return totalPages;
  }, [totalPages, hasNext, currentPage]);

  return (
    <div className="flex flex-col mt-10 mx-4 pad:mx-auto pad:w-[786px] dt:w-[1200px]">
      <Toggle
        toggle={toggle}
        onToggleChange={setToggle}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
        onSubmit={() => runQuery()}
      />

      <section className="flex flex-col border-t-[1px] border-t-black border-b-[1px] border-b-black">
        <DetailList data={filteredData} />
      </section>

      <Pagination
        currentPage={currentPage}
        totalPages={safeTotalPages}
        pageGroup={pageGroup}
        pagesPerGroup={5}
        onPageChange={setCurrentPage}
        onPrevGroup={() => {
          if (pageGroup > 0) {
            setPageGroup(pageGroup - 1);
            setCurrentPage((pageGroup - 1) * 5 + 1);
          }
        }}
        onNextGroup={() => {
          if ((pageGroup + 1) * 5 < safeTotalPages) {
            setPageGroup(pageGroup + 1);
            setCurrentPage((pageGroup + 1) * 5 + 1);
          }
        }}
      />
    </div>
  );
};

export default List;
