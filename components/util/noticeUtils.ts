import { v4 as uuidv4 } from 'uuid';
import { axiosInstance } from '@/api/auth/axios';

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
export const createCommentOrReply = (
  postId: string,
  text: string,
  parentCommentId?: string
) => {
  return axiosInstance.post(`/comment/${postId}/create`, {
    text,
    ...(parentCommentId && { parentCommentId }),
  });
};

// 댓글 추가 함수
export const addCommentOrReply = async (
  postId: string,
  text: string,
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  setChatCount: React.Dispatch<React.SetStateAction<number>>,
  setText: React.Dispatch<React.SetStateAction<string>>,
  parentCommentId?: string,
  setReplyingToId?: React.Dispatch<React.SetStateAction<string | null>>
) => {
  if (text.trim() === '') return;

  try {
    // 댓글/답글 작성 API 호출
    const response = await createCommentOrReply(postId, text, parentCommentId);
    const newCommentOrReply = response.data;

    setComments((prevComments) => {
      if (parentCommentId) {
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
