import React from 'react';
import Comment from './Comment';
import { Comment as CommentType } from './dto';

interface CommentListProps {
  postId: number;
  user: string;
  comments: CommentType[];
  currentUser: string;
  onAddReply: (parentCommentId: string, replyText: string) => void;
  onDeleteComment: (id: string) => void;
  onDeleteReply: (commentId: string, replyId: string) => void;
}

const CommentList: React.FC<CommentListProps> = ({
  postId,
  user,
  comments,
  onAddReply,
  onDeleteComment,
  onDeleteReply,
  currentUser,
}) => {
  const structuredComments = buildCommentTree(comments);

  return (
    <div className="w-full">
      {structuredComments.length > 0 && (
        <div className="flex flex-col">
          {structuredComments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onAddReply={onAddReply}
              onDeleteComment={onDeleteComment}
              onDeleteReply={onDeleteReply}
              replying={false}
              currentUser={currentUser}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentList;

const buildCommentTree = (comments: CommentType[]): CommentType[] => {
  const commentMap: { [key: string]: CommentType } = {};
  const rootComments: CommentType[] = [];

  // 1️⃣ 모든 댓글을 Map에 저장 (삭제된 댓글 포함)
  comments.forEach((comment) => {
    if (!comment.id) return;
    const commentId = comment.id.toString();
    commentMap[commentId] = { ...comment, replies: [] };
  });

  // 2️⃣ 부모-자식 관계 설정
  comments.forEach((comment) => {
    if (!comment.id) return;
    const commentId = comment.id.toString();

    if (
      comment.parentCommentId !== null &&
      comment.parentCommentId !== undefined
    ) {
      const parentId = comment.parentCommentId.toString();
      if (commentMap[parentId]) {
        console.log(`🔗 답글 ${commentId} → 부모 ${parentId} 유지`);
        commentMap[parentId].replies?.push(commentMap[commentId]);
      } else {
        console.warn(`⚠️ 부모 댓글(${parentId}) 없음 → root로 이동 방지`);
      }
    } else {
      rootComments.push(commentMap[commentId]);
    }
  });

  return rootComments;
};
