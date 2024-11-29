'use client';
import { useCallback, useEffect, useState } from 'react';
import { Toggle } from '@/components/announcement/list/Toggle';
import { AnnouncementList } from '@/components/announcement/list/AnnouncementList';
import { CommunityList } from '@/components/announcement/list/CommunityList';
import {
  AnnouncementProps,
  CommunityProps,
  toggleList,
} from '@/components/announcement/list/dto';
import {
  dummyAnnouncement,
  dummyCommunity,
} from '@/components/announcement/list/dummy';
import Pagination from '@/components/announcement/list/Pagination';

const List = () => {
  const [toggle, setToggle] = useState(toggleList[0].toggle);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pageGroup, setPageGroup] = useState(0);

  // 조건 처리
  const items =
    toggle === toggleList[0].toggle ? dummyAnnouncement : dummyCommunity;

  // 필터링된 아이템
  const filteredItems = useCallback(
    () =>
      items.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [items, searchQuery]
  );

  // 필터링된 아이템 개수
  const totalItems = filteredItems().length;

  // 페이지 계산
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

  // 탭이 바뀔 때마다 검색창, 페이지, 페이지 그룹 초기화
  useEffect(() => {
    setSearchQuery('');
    setCurrentPage(1);
    setPageGroup(0);
  }, [toggle]);

  return (
    <div className="flex flex-col mt-10 mx-4 pad:mx-auto pad:w-[786px] dt:w-[1200px]">
      {/* 토글 */}
      <Toggle
        toggle={toggle}
        onToggleChange={setToggle}
        searchQuery={searchQuery}
        onSearchChange={(query) => {
          setSearchQuery(query);
          setCurrentPage(1); // 검색할 때 페이지 초기화
        }}
      />

      {/* 리스트 */}
      <section className="flex flex-col border-t-[1px] border-t-black border-b-[1px] border-b-black">
        {toggle === toggleList[0].toggle && (
          <AnnouncementList
            items={filteredItems() as AnnouncementProps[]}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
        )}
        {toggle === toggleList[1].toggle && (
          <CommunityList
            items={filteredItems() as CommunityProps[]}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
        )}
      </section>

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

export default List;
