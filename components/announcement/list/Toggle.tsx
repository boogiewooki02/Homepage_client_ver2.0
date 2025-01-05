import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toggleList } from '@/components/announcement/list/dto';
import blackSearch from '@/public/image/announcement/blackSearch.svg';
import blackPen from '@/public/image/announcement/blackPen.svg';
import { useEffect, useState } from 'react';
import { authInstance } from '@/api/auth/axios';

export const Toggle = ({
  toggle,
  onToggleChange,
  searchQuery,
  onSearchChange,
}: {
  toggle: string;
  onToggleChange: (toggle: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}) => {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null); // 사용자 role 상태

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await authInstance.get('/user');
        const { role } = response.data.result;
        setUserRole(role); // role 저장
      } catch (error) {
        console.error('유저 role 가져오기 실패:', error);
      }
    };

    fetchUserRole();
  }, []);
  return (
    <section className="flex flex-col gap-6 pad:flex-row pad:gap-0 mb-6 text-2xl font-semibold justify-between">
      <ul className="flex gap-6">
        {toggleList.map((category) => (
          <li
            key={category.toggle}
            onClick={() => onToggleChange(category.toggle)}
            className={`cursor-pointer ${toggle === category.toggle ? 'text-black' : 'text-gray-40'}`}
          >
            {category.toggle}
          </li>
        ))}
      </ul>
      <div className="flex justify-between gap-5">
        <div className="relative flex-1">
          <input
            placeholder="게시글 검색"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`relative w-full pad:w-[200px] ${toggle === toggleList[1].toggle ? 'h-[32px]' : 'h-[38px]'} pad:h-[38px] border-[1px] text-[16px] pad:text-[20px] font-[500] border-black rounded-[8px] focus:outline-none pl-3 pr-9 py-1`}
          />
          <Image
            src={blackSearch}
            alt="search"
            width={24}
            height={24}
            className="absolute top-[6px] right-[12px] cursor-pointer"
          />
        </div>
        {(toggle === toggleList[1].toggle ||
          (toggle === toggleList[0].toggle && userRole === 'ADMIN')) && (
          <div
            onClick={() => router.push('/announcement/posting')}
            className="h-[38px] border-[1px] border-black rounded-[8px] px-3 py-1 flex gap-5 items-center cursor-pointer"
          >
            <span className="hidden pad:block text-gray-40 text-[20px] font-[500]">
              글쓰기
            </span>
            <Image src={blackPen} alt="pen" width={24} height={24} />
          </div>
        )}
      </div>
    </section>
  );
};
