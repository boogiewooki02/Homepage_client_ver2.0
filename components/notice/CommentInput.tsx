import React, { useState } from 'react';
import Send from '@mui/icons-material/Send';

interface CommentInputProps {
  commentText: string;
  setCommentText: (text: string) => void;
  onAddComment: () => void;
  user: string;
}

const CommentInput: React.FC<CommentInputProps> = ({
  commentText,
  setCommentText,
  onAddComment,
  user,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter' && user) onAddComment();
  };

  return (
    <div className="w-full flex items-start gap-3 mb-10">
      <input
        type="text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder=" 댓글을 입력하세요"
        className="w-full min-h-[60px] border font-pretendard text-base font-semibold border-black rounded-lg px-3 py-2 placeholder:text-gray-40 focus:outline-none"
        disabled={!user}
      />
      <button
        className="border rounded-lg border-black min-w-[60px] min-h-[60px] cursor-pointer flex items-center justify-center"
        onClick={onAddComment}
        disabled={!user}
      >
        <Send
          width={20}
          height={20}
          style={{ margin: '0px 0px 4px 2px', transform: 'rotate(-40deg)' }}
        />
      </button>
    </div>
  );
};

export default CommentInput;
