import React from 'react';
import Comment from './Comment';

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

interface CommentListProps {
  postId: number;
  user: string;
  comments: Comment[];
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
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentList;
const buildCommentTree = (comments: Comment[]): Comment[] => {
  const commentMap: { [key: string]: Comment } = {};
  const rootComments: Comment[] = [];
  comments.forEach((comment) => {
    if (!comment.id) {
      return;
    }

    const commentId = comment.id.toString();
    commentMap[commentId] = { ...comment, replies: [] };
  });

  comments.forEach((comment) => {
    if (!comment.id) return;
    if (
      comment.parentCommentId !== null &&
      comment.parentCommentId !== undefined
    ) {
      const parentId = comment.parentCommentId.toString();
      if (commentMap[parentId]) {
        commentMap[parentId].replies?.push(commentMap[comment.id.toString()]);
      }
    } else {
      rootComments.push(commentMap[comment.id.toString()]);
    }
  });

  return rootComments;
};
