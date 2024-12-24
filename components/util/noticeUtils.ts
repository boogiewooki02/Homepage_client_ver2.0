import { v4 as uuidv4 } from 'uuid';
import { axiosInstance } from '@/api/auth/axios';
import { log } from 'console';

// 댓글 및 답글 데이터 타입 정의
export interface Reply {
  id: string;
  name: string;
  date: string;
  text: string;
  replying: boolean;
  deleted?: boolean;
}

export interface Comment {
  id: string;
  name: string;
  date: string;
  text: string;
  replying: boolean;
  replies?: Reply[];
  deleted?: boolean;
}

// 댓글/답글 작성 API 함수
export const createCommentOrReply = async (
  postId: number,
  text: string,
  user: string,
  parentCommentId?: string | number
): Promise<{ data: Comment }> => {
  const token = localStorage.getItem('access_token');

  try {
    const response = await axiosInstance.post(
      `/comment/${postId}/create`,
      {
        user, // 유저 정보
        content: text, // 댓글 내용
        ...(parentCommentId !== undefined && { parentCommentId }), // 부모 댓글 ID가 있으면 추가
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // response.data를 Comment 타입으로 반환
    const newCommentOrReply: Comment = {
      id: response.data.id,
      text: response.data.content,
      name: response.data.user,
      replies: response.data.replies || [],
      date: response.data.date || new Date().toISOString(),
      replying: response.data.replyingts || false,
    };

    return { data: newCommentOrReply };
  } catch (error) {
    console.error('댓글/답글 작성 API 요청 실패:', error);
    throw error; // 실패 시 에러를 throw하여 상위 함수에서 처리하도록 합니다.
  }
};

// 댓글 추가 함수
export const addCommentOrReply = async (
  postId: number,
  text: string,
  user: string, // 유저 정보 추가
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  setChatCount: React.Dispatch<React.SetStateAction<number>>,
  setText: React.Dispatch<React.SetStateAction<string>>,
  parentCommentId: string | number = 0, // 기본값 0 설정
  setReplyingToId?: React.Dispatch<React.SetStateAction<string | null>>
) => {
  if (text.trim() === '') return;

  try {
    // 댓글/답글 작성 API 호출
    const response = await createCommentOrReply(
      postId,
      text,
      user,
      parentCommentId
    );
    const newCommentOrReply = response.data;

    setComments((prevComments) => {
      if (parentCommentId !== 0) {
        // 답글 추가
        return prevComments.map((comment) =>
          comment.id === parentCommentId
            ? {
                ...comment,
                replies: [...(comment.replies || []), newCommentOrReply],
              }
            : comment
        );
      } else {
        // 댓글 추가
        return [...prevComments, newCommentOrReply];
      }
    });

    setText(''); // 입력 필드 초기화
    setChatCount((prev) => prev + 1); // 댓글 수 증가
    if (setReplyingToId) setReplyingToId(null); // 답글 상태 초기화
  } catch (error) {
    console.error('댓글/답글 작성 실패:', error);
  }
};

// 댓글 삭제 함수
export const handleDeleteComment = (
  id: string,
  comments: Comment[],
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  setChatCount: React.Dispatch<React.SetStateAction<number>>
) => {
  setComments((prevComments) =>
    prevComments.map((comment) =>
      comment.id === id
        ? { ...comment, text: '삭제된 댓글입니다.', deleted: true }
        : comment
    )
  );
  setChatCount((prev) => Math.max(0, prev - 1));
};

// 답글 삭제 함수
export const handleDeleteReply = (
  commentId: string,
  replyId: string,
  comments: Comment[],
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  setChatCount: React.Dispatch<React.SetStateAction<number>>
) => {
  setComments((prevComments) =>
    prevComments.map((comment) =>
      comment.id === commentId
        ? {
            ...comment,
            replies: comment.replies
              ? comment.replies
                  .map((reply) =>
                    reply.id === replyId ? { ...reply, deleted: true } : reply
                  )
                  .filter((reply) => !reply.deleted) // 삭제된 답글 필터링
              : [],
          }
        : comment
    )
  );
  setChatCount((prev) => Math.max(0, prev - 1));
};

// 삭제 확인 및 취소 함수
export const handleDeleteConfirm = (
  setShowDeletePopup: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setShowDeletePopup(false);
};

export const handleDeleteCancel = (
  setShowDeletePopup: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setShowDeletePopup(false);
};
