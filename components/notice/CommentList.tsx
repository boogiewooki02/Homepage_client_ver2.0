import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import { axiosInstance } from '@/api/auth/axios';

interface Comment {
  id: string;
  name: string;
  date: string;
  text: string;
  replying: boolean;
  replies?: Comment[];
}

interface CommentListProps {
  postId: number;
  comments: Comment[];
  onAddReply: (parentCommentId: string, replyText: string) => void;
  onDeleteComment: (id: string) => void;
  onDeleteReply: (commentId: string, replyId: string) => void;
}

const CommentList: React.FC<CommentListProps> = ({
  postId,
  onAddReply,
  onDeleteComment,
  onDeleteReply,
}) => {
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [replyingId, setReplyingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axiosInstance.get(`/comment/${postId}/list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCommentList(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleToggleReplying = (id: string) => {
    setReplyingId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="w-full">
      {commentList.length > 0 && (
        <div className="flex flex-col">
          {commentList.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onAddReply={
                (replyText) => onAddReply(comment.id, replyText) // Pass the comment ID as the parentCommentId
              }
              onToggleReplying={handleToggleReplying}
              onDeleteComment={onDeleteComment}
              onDeleteReply={onDeleteReply}
              replying={comment.id === replyingId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentList;
