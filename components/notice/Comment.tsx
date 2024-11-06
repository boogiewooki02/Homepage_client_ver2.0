import Image from 'next/image';
import { useState } from 'react';
import defaultImg from '@/public/image/notice/defaultProfile.svg';
import Send from '@mui/icons-material/Send';
import DeletePopup from '@/components/notice/DeleteCommentPopup';

interface CommentProps {
  comment: {
    id: string;
    name: string;
    date: string;
    text: string;
    replying: boolean;
    replies?: any[];
    deleted?: boolean;
  };
  onAddReply: (id: string, replyText: string) => void;
  onToggleReplying: (id: string) => void;
  onDeleteComment: (id: string) => void;
  onDeleteReply: (commentId: string, replyId: string) => void;
}

const Comment: React.FC<CommentProps> = ({
  comment,
  onAddReply,
  onToggleReplying,
  onDeleteComment,
  onDeleteReply,
}) => {
  const [replyText, setReplyText] = useState('');
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showDeleteReplyPopup, setShowDeleteReplyPopup] = useState<
    string | null
  >(null);

  const handleAddReply = () => {
    if (replyText.trim() === '') return;
    onAddReply(comment.id, replyText);
    setReplyText('');
  };

  const handleDeleteCommentConfirm = () => {
    onDeleteComment(comment.id);
    comment.deleted = true;
    setShowDeletePopup(false);
  };

  const handleDeleteReplyConfirm = (replyId: string) => {
    onDeleteReply(comment.id, replyId);
    setShowDeleteReplyPopup(null);
  };

  const handleDeleteCancel = () => {
    setShowDeletePopup(false);
    setShowDeleteReplyPopup(null);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start gap-3">
        <Image
          src={defaultImg}
          alt="default-profile"
          width={54}
          height={54}
          className="rounded-full"
        />
        <div className="w-full flex flex-col gap-1 overflow-auto">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-1">
              <span className="font-pretendard text-base font-normal">
                {comment.name}
              </span>
              <span className="flex items-center font-pretendard text-[10px] text-gray-40 font-normal">
                {comment.date}
              </span>
            </div>
            {!comment.deleted && (
              <span
                className="font-pretendard text-base text-danger-50 font-normal cursor-pointer"
                onClick={() => setShowDeletePopup(true)}
              >
                삭제
              </span>
            )}
          </div>
          <p className="font-pretendard text-base break-words">
            {comment.deleted ? '삭제된 댓글입니다.' : comment.text}
          </p>
          <button
            className="flex items-start font-pretendard text-sm text-gray-40 hover:underline"
            onClick={() => onToggleReplying(comment.id)}
          >
            답글달기
          </button>
        </div>
      </div>

      {/* 답글 리스트 */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="flex flex-col gap-8 ml-6">
          {comment.replies.map((reply) => (
            <div key={reply.id} className="flex items-start gap-3">
              <Image
                src={defaultImg}
                alt="default-profile"
                width={54}
                height={54}
                className="rounded-full flex items-start"
              />
              <div className="w-full flex flex-col gap-1 overflow-auto">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row gap-1">
                    <span className="font-pretendard text-base font-normal">
                      {reply.name}
                    </span>
                    <span className="flex items-center font-pretendard text-[10px] text-gray-40 font-normal">
                      {reply.date}
                    </span>
                  </div>
                  <div>
                    <span
                      className="font-pretendard text-base text-danger-50 font-normal cursor-pointer"
                      onClick={() => setShowDeleteReplyPopup(reply.id)}
                    >
                      삭제
                    </span>
                  </div>
                </div>
                <p className="font-pretendard text-base break-words">
                  {reply.text}
                </p>
              </div>
              {showDeleteReplyPopup === reply.id && (
                <DeletePopup
                  onConfirm={() => handleDeleteReplyConfirm(reply.id)} // 답글 삭제 확인
                  onClose={handleDeleteCancel} // 취소 버튼
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* 답글 입력창 */}
      {comment.replying && (
        <div className="w-full flex items-start gap-3 ml-6">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing) return;
              if (e.key === 'Enter') handleAddReply();
            }}
            className="min-h-[60px] min-w-[calc(100%-96px)] border font-pretendard text-base font-semibold border-black rounded-lg px-3 py-2 placeholder:text-gray-40 focus:outline-none"
            placeholder=" 댓글을 입력하세요"
          />
          <div
            className="flex items-center justify-center border rounded-lg border-black w-[60px] h-[60px] cursor-pointer"
            onClick={handleAddReply}
          >
            <Send width={20} height={20} />
          </div>
        </div>
      )}
      {showDeletePopup && (
        <DeletePopup
          onConfirm={handleDeleteCommentConfirm} // 댓글 삭제 확인
          onClose={handleDeleteCancel} // 취소 버튼
        />
      )}
    </div>
  );
};

export default Comment;
