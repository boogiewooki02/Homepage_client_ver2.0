import { v4 as uuidv4 } from 'uuid';
import { authInstance } from '@/api/auth/axios';

export interface Reply {
  id: string;
  user: string;
  date: string;
  content: string;
  replying: boolean;
  deleted?: boolean;
}

interface Comment {
  id: string;
  postId: number;
  user: string;
  date: string;
  content: string;
  parentCommentId?: string | null;
  deletedAt?: string | null;
  replies?: Comment[];
  created_at: string;
}

export const createCommentOrReply = async (
  postId: number,
  text: string,
  user: string,
  parentCommentId?: string | number
): Promise<{ data: Comment }> => {
  try {
    const response = await authInstance.post(`/comment/${postId}/create`, {
      user,
      content: text,
      ...(parentCommentId !== undefined && { parentCommentId }),
    });

    return { data: response.data };
  } catch (error) {
    console.error('댓글/답글 작성 API 요청 실패:', error);
    throw error;
  }
};

export const addCommentOrReply = async (
  postId: number,
  text: string,
  user: string,
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  setChatCount: React.Dispatch<React.SetStateAction<number>>,
  setText: React.Dispatch<React.SetStateAction<string>>,
  parentCommentId?: string | number,
  setReplyingToId?: React.Dispatch<React.SetStateAction<string | null>>
) => {
  if (text.trim() === '') return;

  try {
    const response = await createCommentOrReply(
      postId,
      text,
      user,
      parentCommentId
    );
    const newCommentOrReply = response.data;
    setComments((prevComments) => {
      if (parentCommentId) {
        return prevComments.map((comment) =>
          comment.id === parentCommentId
            ? {
                ...comment,
                replies: [...(comment.replies || []), newCommentOrReply],
              }
            : comment
        );
      } else {
        return [newCommentOrReply, ...prevComments];
      }
    });

    setText('');
    setChatCount((prev) => prev + 1);
    if (setReplyingToId) setReplyingToId(null);
  } catch (error) {
    console.error('댓글/답글 작성 실패:', error);
  }
};
export const handleDeleteComment = async (
  id: string,
  postId: number,
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  setChatCount: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    const response = await authInstance.delete(
      `/comment/${postId}/${id}/delete`
    );
    console.log('✅ 댓글 삭제 성공:', response);

    setComments((prevComments) => {
      console.log('📌 기존 댓글 목록:', prevComments);

      return prevComments
        .map((comment) => {
          if (comment.id === id) {
            if (comment.replies && comment.replies.length > 0) {
              console.log(
                `✅ 답글 있는 댓글 (${comment.id}) → "삭제된 댓글입니다."로 변경`
              );
              return {
                ...comment,
                deletedAt: new Date().toISOString(),
                content: '삭제된 댓글입니다.',
                user: '',
              };
            } else {
              console.log(`❌ 답글 없는 댓글 (${comment.id}) → 완전히 삭제`);
              return null; // 댓글이 완전히 삭제됨
            }
          }

          // ✅ 부모 댓글이 삭제된 경우에도 답글의 `parentCommentId`를 유지해야 함.
          if (comment.replies) {
            comment.replies = comment.replies.map((reply) => {
              if (reply.id === id) {
                console.log(
                  `✅ 답글 ${reply.id}의 부모 삭제 → "삭제된 댓글입니다."로 변경`
                );
                return {
                  ...reply,
                  deletedAt: new Date().toISOString(),
                  content: '삭제된 댓글입니다.',
                  user: '',
                };
              }
              return reply; // ✅ 나머지 답글은 그대로 유지
            });
          }

          return comment;
        })
        .filter((comment): comment is Comment => comment !== null);
    });

    setChatCount((prev) => Math.max(0, prev - 1));
  } catch (error) {
    console.error('❌ 댓글 삭제 실패:', error);
  }
};

export const handleDeleteReply = async (
  commentId: string,
  postId: number,
  replyId: string,
  comments: Comment[],
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  setChatCount: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    await authInstance.delete(`/comment/${postId}/${replyId}/delete`);

    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: comment.replies
                ? comment.replies.filter((reply) => reply.id !== replyId)
                : [],
            }
          : comment
      )
    );

    setChatCount((prev) => Math.max(0, prev - 1));
  } catch (error) {
    console.error('답글 삭제 실패:', error);
  }
};

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
