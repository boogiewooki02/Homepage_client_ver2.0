import Image from 'next/image';
import { useState, useCallback } from 'react';
import defaultImg from '@/public/image/notice/defaultProfile.svg';
import Send from '@mui/icons-material/Send';
import { Comment as CommentType } from './dto';
import DeletePopup from '@/components/notice/DeleteCommentPopup';

interface CommentProps {
  comment: CommentType;
  currentUser: string;
  onAddReply: (parentCommentId: string, replyText: string) => void;
  onDeleteComment: (id: string) => void;
  onDeleteReply: (commentId: string, replyId: string) => void;
  replying: boolean;
}

const Comment: React.FC<CommentProps> = ({
  comment,
  onAddReply,
  onDeleteComment,
  onDeleteReply,
  currentUser,
}) => {
  const [replyText, setReplyText] = useState('');
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [replyingId, setReplyingId] = useState<string | null>(null);

  const handleAddReply = useCallback(() => {
    if (replyText.trim() === '') return;
    onAddReply(comment.id, replyText);
    setReplyText('');
  }, [replyText, comment.id, onAddReply]);

  const handleDeleteCommentConfirm = useCallback(() => {
    onDeleteComment(comment.id);
    setShowDeletePopup(false);
  }, [onDeleteComment, comment.id]);

  const handleToggleReplying = useCallback(() => {
    setReplyingId((prevId) => (prevId === comment.id ? null : comment.id));
  }, [comment.id]);
  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    date.setHours(date.getHours() + 9);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월 (0부터 시작하므로 +1)
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}. ${month}. ${day} ${hours}:${minutes}`;
  };
  const isAuthor = currentUser === comment.user;

  return (
    <div
      className={`flex flex-col gap-8 ${
        comment.parentCommentId ? '' : 'mb-10'
      }`}
    >
      {comment.deletedAt && comment.replies && comment.replies.length > 0 ? (
        <p className="font-pretendard text-base break-words">
          삭제된 댓글입니다.
        </p>
      ) : (
        <div className="flex items-start gap-3">
          <Image
            src={defaultImg}
            alt="default-profile"
            width={54}
            height={54}
            className="rounded-full"
          />
          <div className="w-full flex flex-col gap-1 overflow-auto">
            <div className="flex w-full flex-row justify-between">
              <div className="flex flex-row gap-1">
                <span className="font-pretendard text-base font-normal">
                  {comment.user}
                </span>
                <span className="flex items-center font-pretendard text-[10px] text-gray-40 font-normal">
                  {formatDate(comment.created_at)}
                </span>
              </div>
              {isAuthor && (
                <span
                  className="font-pretendard text-base text-danger-50 font-normal cursor-pointer"
                  onClick={() => setShowDeletePopup(true)}
                >
                  삭제
                </span>
              )}
            </div>
            <p className="font-pretendard text-base break-words">
              {comment.content}
            </p>
            {!comment.parentCommentId && (
              <button
                className="flex items-start font-pretendard text-sm text-gray-40 hover:underline"
                onClick={handleToggleReplying}
              >
                답글달기
              </button>
            )}
          </div>
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="flex flex-col gap-8 ml-6">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id} // ✅ reply.id가 고유한 값인지 확인
              comment={reply}
              onAddReply={onAddReply}
              onDeleteComment={onDeleteComment}
              onDeleteReply={onDeleteReply}
              replying={replyingId === reply.id}
              currentUser={currentUser}
            />
          ))}
        </div>
      )}

      {!comment.deletedAt && replyingId === comment.id && (
        <div className="w-full flex items-start gap-3 ml-6">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing) return;
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddReply();
              }
            }}
            className="min-h-[60px] min-w-[calc(100%-96px)] border font-pretendard text-base font-semibold border-black rounded-lg px-3 py-2 placeholder:text-gray-40 focus:outline-none"
            placeholder=" 댓글을 입력하세요"
          />
          <div
            className="flex items-center justify-center border rounded-lg border-black w-[60px] h-[60px] cursor-pointer"
            onClick={handleAddReply}
          >
            <Send
              width={20}
              height={20}
              style={{ transform: 'rotate(-40deg)' }}
            />
          </div>
        </div>
      )}
      {showDeletePopup && (
        <DeletePopup
          isOpen={showDeletePopup}
          onConfirm={handleDeleteCommentConfirm}
          onClose={() => {
            setShowDeletePopup(false);
          }}
        />
      )}
    </div>
  );
};

export default Comment;
