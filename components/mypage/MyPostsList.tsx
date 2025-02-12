import { useEffect, useState } from 'react';
import { authInstance } from '@/api/auth/axios';
import likeIcon from '@/public/image/mypage/grayHeart.svg';
import chatIcon from '@/public/image/mypage/grayChat.svg';
import Image from 'next/image';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useRouter } from 'next/navigation';

interface myPostProps {
  id: number;
  title: string;
  content: string;
  writer: string;
  likes: number;
  commentsCount: number;
  imageUrls: string;
  created_at: string;
  updated_at: string;
  deletedAt: string | null;
  liked: boolean;
}

// 내가 쓴 글 리스트
const MyPostsList = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<myPostProps[]>([]);

  // 페이지네이션 관련 state
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수

  const PAGE_SIZE = 5; // 한 페이지에 보여줄 게시글 수

  const getPosts = async (page: number) => {
    try {
      const response = await authInstance.get('my-page/post/list', {
        params: {
          page: page,
          size: PAGE_SIZE,
        },
      });

      const postsWithCommentCount = await Promise.all(
        response.data.result.content.map(async (post: myPostProps) => {
          const commentsCount = await getCommentCount(post.id);
          return { ...post, commentsCount };
        })
      );

      setPosts(postsWithCommentCount);
      setTotalPages(response.data.result.totalPages);
    } catch (error) {
      console.error(error);
      alert('게시글을 불러오는 중 문제가 발생했습니다.');
    }
  };

  // 댓글 카운트를 가져오는 함수
  const getCommentCount = async (postId: number) => {
    try {
      const response = await authInstance.get(`comment/${postId}/list`);
      // deletedAt이 null인 댓글만 카운트
      const activeComments = response.data.result.comments.filter(
        (comment: any) => comment.deletedAt === null
      );
      return activeComments.length;
    } catch (error) {
      console.error('댓글을 불러오는 중 문제가 발생했습니다.', error);
      return 0; // 에러가 발생하면 댓글 수는 0으로 처리
    }
  };

  // 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  // 게시글 클릭 핸들러
  const handlePostClick = (postId: number) => {
    router.push(`/announcement/post/${postId}`); // 상세 페이지로 이동
  };

  // 날짜 포맷 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}`;
  };

  useEffect(() => {
    getPosts(currentPage);
  }, [currentPage]);

  return (
    <div className="border-t-[1px] border-t-black">
      <ul>
        {posts.map((post, index, arr) => {
          const isLastItem = index === arr.length - 1; // 현재 페이지에서 마지막 항목인지 확인

          return (
            <li
              key={post.id}
              className={`flex flex-col pad:flex-row py-6 items-start gap-4 self-stretch relative cursor-pointer ${
                isLastItem
                  ? 'border-b-[1px] border-b-black'
                  : 'border-b-[1px] border-b-gray-10'
              } justify-between`}
              onClick={() => handlePostClick(post.id)}
            >
              <p className="text-[20px] leading-6 w-full truncate">
                {post.title}
              </p>

              <div className="flex gap-10 text-gray-40">
                <div className="flex gap-6">
                  <div className="flex gap-[10px]">
                    <Image src={likeIcon} alt="like" width={14} height={14} />
                    <p>{post.likes}</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <Image src={chatIcon} alt="chat" width={18} height={18} />
                    <p>{post.commentsCount}</p>
                  </div>
                </div>
                <p>{formatDate(post.created_at)}</p>
              </div>
            </li>
          );
        })}
      </ul>

      {/* 페이지네이션 */}
      <section className="flex justify-center gap-3 mt-10 items-center ">
        {/* 이전 페이지 */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="flex items-center w-[30px] h-[30px] rotate-180"
        >
          {currentPage > 0 ? (
            <ChevronRightIcon sx={{ color: '#000000' }} />
          ) : (
            <ChevronRightIcon sx={{ color: '#9296AB' }} />
          )}
        </button>

        {/* 현재 페이지 */}
        <div className="w-[30px] h-[30px] cursor-pointer rounded-full flex justify-center items-center border-[1px] border-black">
          <span className="font-[500] text-[20px]">{currentPage + 1}</span>
        </div>

        {/* 다음 페이지 */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          className="flex items-center w-[30px] h-[30px]"
        >
          {currentPage + 1 < totalPages ? (
            <ChevronRightIcon sx={{ color: '#000000' }} />
          ) : (
            <ChevronRightIcon sx={{ color: '#9296AB' }} />
          )}
        </button>
      </section>
    </div>
  );
};

export default MyPostsList;
