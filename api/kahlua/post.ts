import { authInstance } from '@/api/auth/axios';
import { MyPost } from '@/types/post';

// 글 목록 조회
export const fetchPostList = async ({
  postType,
  page,
  size,
  searchWord,
}: {
  postType: 'NOTICE' | 'KAHLUA_TIME';
  page: number;
  size: number;
  searchWord?: string;
}) => {
  const response = await authInstance.get('/post/list', {
    params: {
      post_type: postType,
      page,
      size,
      search_word: searchWord,
    },
  });

  return response.data.result;
};

// 글 댓글 목록 조회
export const fetchPostComments = async (postId: number) => {
  const response = await authInstance.get(`/comment/${postId}/list`);
  return response.data.result.comments || [];
};

// 내가 쓴 글 리스트 조회
export const fetchMyPosts = async (
  page: number,
  size: number
): Promise<{ posts: MyPost[]; totalPages: number } | null> => {
  try {
    const response = await authInstance.get('my-page/post/list', {
      params: { page, size },
    });
    return {
      posts: response.data.result.content,
      totalPages: response.data.result.totalPages,
    };
  } catch (error) {
    console.error('내 게시글 조회 실패:', error);
    return null;
  }
};

// 댓글 수 조회
export const fetchCommentCount = async (postId: number): Promise<number> => {
  try {
    const comments = await fetchPostComments(postId);
    return comments.filter((comment: any) => comment.deletedAt === null).length;
  } catch (error) {
    console.error('댓글 수 조회 실패:', error);
    return 0;
  }
};
