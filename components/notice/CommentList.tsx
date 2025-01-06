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
  comments.forEach((comment) => {
    if (!comment.id) return;
    const commentId = comment.id.toString();

    commentMap[commentId] = {
      ...comment,
      content: comment.deletedAt ? '삭제된 댓글입니다.' : comment.content, // 삭제된 댓글이면 메시지 변경
      replies: [],
    };
  });

  comments.forEach((comment) => {
    if (!comment.id) return;
    const commentId = comment.id.toString();

    if (
      comment.parentCommentId !== null &&
      comment.parentCommentId !== undefined
    ) {
      const parentId = comment.parentCommentId.toString();

      if (!commentMap[parentId]) {
        commentMap[parentId] = {
          id: parentId,
          postId: comment.postId,
          date: '',
          content: '삭제된 댓글입니다.',
          user: '',
          deletedAt: new Date().toISOString(),
          replies: [],
          parentCommentId: null,
          created_at: new Date().toISOString(),
        };
        rootComments.push(commentMap[parentId]);
      }

      if (!comment.deletedAt) {
        commentMap[parentId].replies?.push(commentMap[commentId]);
      }
    } else {
      rootComments.push(commentMap[commentId]);
    }
  });

  return rootComments;
};
