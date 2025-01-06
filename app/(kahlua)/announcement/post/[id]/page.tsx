'use client';
import React, { useState } from 'react';
import CommentList from '@/components/notice/CommentList';
import Image from 'next/image';
import arrow from '@/public/image/notice/Left.svg';
import DeletePopup from '@/components/notice/DeletePostPopup';
import CommentInput from '@/components/notice/CommentInput';
import Post from '@/components/notice/Post';
import {
  addComment,
  addReply,
  handleDeleteComment,
  handleDeleteReply,
  handleDeleteCancel,
  handleDeleteConfirm,
} from '@/components/util/noticeUtils';

const Page = () => {
  const [data, setData] = useState({
    title: '❗️깔루아 9월 정기공연❗️',
    content: `안녕하세요 깔루아 21기 기장 최승원입니다🤩
9월 1일 금요일, 깔루아의 9월 정기공연이 있습니다‼️
재학생이신 선배님들께서는 수업이 끝난 후에, 졸업생이신 선배님들께서는 시간이 되신다면 공연 보러오셔서 함께 즐겨주시면 좋을 것 같습니다 !!

> 9월 정기공연 일정 <
날짜 : 9월 1일 금요일
시간 : 오후 6시 ~ 9시
장소 : 플렉스라운지
티켓가격 : 5000원

뒷풀이 : 오후 9시 ~
장소: 오맥

공연 이후에 뒷풀이를 진행할 예정입니다. 뒷풀이 장소 예약을 위해서 대략적인 인원을 확인하고 있습니다!
혹시 공연에 참석하시는 선배님들이나, 뒷풀이에 참석하시는 선배님들께서는 010-4827-2589로 연락주시면 감사하겠습니다🤩

기타 모든 문의사항은 페이스북 메세지나 댓글, 또는 위의 전화번호로 연락주세요 ! 감사합니다🤩🤩`,
    user: '관리자',
    date: '2024. 08. 01',
    imageUrls: [
      'https://i.ibb.co/hypZvxt/IMG-3791.jpg',
      'https://i.ibb.co/hypZvxt/IMG-3791.jpg',
      'https://i.ibb.co/hypZvxt/IMG-3791.jpg',
      'https://i.ibb.co/hypZvxt/IMG-3791.jpg',
      'https://i.ibb.co/hypZvxt/IMG-3791.jpg',
    ],
  });

  const [chatCount, setChatCount] = useState(0);
  const [replyingToId, setReplyingToId] = useState<string | null>(null);

  const [comments, setComments] = useState<
    {
      id: string;
      name: string;
      date: string;
      text: string;
      replying: boolean;
      replies?: any[];
      deleted?: boolean;
    }[]
  >([]);
  const [commentText, setCommentText] = useState('');
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [replyText, setReplyText] = useState('');
  const commentCount = comments.filter((comment) => !comment.deleted).length;
  const replyCount = comments.reduce(
    (total, comment) =>
      total +
      (comment.replies
        ? comment.replies.filter((reply) => !reply.deleted).length
        : 0),
    0
  );

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center pt-16 w-full max-w-[500px] pad:max-w-[786px] dt:max-w-[1200px] max-pad:px-[16px]">
        <Post
          noticeData={{
            ...data,
            imageUrls: data.imageUrls || [],
          }}
          commentCount={commentCount}
          replyCount={replyCount}
        />

        {/* 댓글 리스트 */}
        <CommentList
          comments={comments}
          onAddReply={(id, text) =>
            addReply(
              id,
              text,
              comments,
              setComments,
              setReplyingToId,
              setReplyText,
              setChatCount
            )
          }
          onDeleteComment={(id) =>
            handleDeleteComment(id, comments, setComments, setChatCount)
          }
          onDeleteReply={(commentId, replyId) =>
            handleDeleteReply(
              commentId,
              replyId,
              comments,
              setComments,
              setChatCount
            )
          }
        />

        {/* 댓글 입력창 */}
        <CommentInput
          commentText={commentText}
          setCommentText={setCommentText}
          onAddComment={() =>
            addComment(
              commentText,
              comments,
              setComments,
              setChatCount,
              setCommentText
            )
          }
        />

        <div className="w-full">
          <div className="flex items-start w-full">
            <div className="flex w-[90px] cursor-pointer gap-[10px]">
              <Image src={arrow} alt="arrow" width={24} height={24} />
              <span className="font-pretendard text-base font-medium">
                목록으로
              </span>
            </div>
          </div>
        </div>
      </div>

      {showDeletePopup && (
        <DeletePopup
          isOpen={showDeletePopup}
          onConfirm={() => handleDeleteConfirm(setShowDeletePopup)}
          onClose={() => handleDeleteCancel(setShowDeletePopup)}
        />
      )}
    </div>
  );
};

export default Page;
