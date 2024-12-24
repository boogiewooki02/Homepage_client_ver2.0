'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CommentList from '@/components/notice/CommentList';
import Image from 'next/image';
import arrow from '@/public/image/notice/Left.svg';
import DeletePopup from '@/components/notice/DeletePostPopup';
import CommentInput from '@/components/notice/CommentInput';
import Post from '@/components/notice/Post';
import {
  addCommentOrReply,
  handleDeleteComment,
  handleDeleteReply,
  handleDeleteCancel,
  handleDeleteConfirm,
} from '@/components/util/noticeUtils';
import { axiosInstance } from '@/api/auth/axios';

interface PostData {
  title: string;
  content: string;
  user: string;
  date: string;
  imageUrls: string[];
  likes: number;
  id: number;
}

interface Comment {
  id: string;
  name: string;
  date: string;
  text: string;
  replying: boolean;
  replies?: Comment[];
  deleted?: boolean;
}

const Page = () => {
  const router = useRouter();
  const postId = 1; // 게시글 ID
  const [postData, setPostData] = useState<PostData>({
    title: '',
    content: '',
    user: '',
    date: '',
    imageUrls: [],
    likes: 0,
    id: 0,
  });

  const [chatCount, setChatCount] = useState(0); // 댓글 수
  const [replyingToId, setReplyingToId] = useState<string | null>(null); // 답글 달기
  const [comments, setComments] = useState<Comment[]>([]); // 댓글 목록
  const [commentText, setCommentText] = useState(''); // 댓글 텍스트
  const [showDeletePopup, setShowDeletePopup] = useState(false); // 삭제 팝업
  const [replyText, setReplyText] = useState(''); // 답글 텍스트
  const user = '깔루아 홍길동';
  const commentCount = comments.filter((comment) => !comment.deleted).length;
  const replyCount = comments.reduce(
    (total, comment) =>
      total +
      (comment.replies
        ? comment.replies.filter((reply) => !reply.deleted).length
        : 0),
    0
  );

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axiosInstance.get(
          `/post/notice/${postId}/detail`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data.result;

        const imageUrls = data.imageUrls
          ? Array.isArray(data.imageUrls)
            ? data.imageUrls
            : typeof data.imageUrls === 'string'
              ? (data.imageUrls.split(',') as string[])
              : []
          : [];
        setPostData({
          ...data,
          imageUrls,
        });
      } catch (error) {
        console.error('Error fetching post data', error);
      }
    };

    fetchPostData();
  }, []);

  const handleGoBack = () => {
    router.push('/announcement');
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center pt-16 w-full max-w-[500px] pad:max-w-[786px] dt:max-w-[1200px] max-pad:px-[16px]">
        <Post
          noticeData={postData}
          postId={postId}
          commentCount={commentCount}
          replyCount={replyCount}
        />

        {/* 댓글 리스트 */}
        <CommentList
          postId={postId}
          comments={comments}
          onAddReply={(parentCommentId, text) =>
            addCommentOrReply(
              postId,
              user,
              text,
              setComments,
              setChatCount,
              setReplyText,
              parentCommentId,
              setReplyingToId
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

        {/* 댓글 입력 폼 */}
        <CommentInput
          commentText={commentText}
          setCommentText={setCommentText}
          onAddComment={() =>
            addCommentOrReply(
              postId,
              commentText,
              user, // Ensure user is passed correctly here
              setComments,
              setChatCount,
              setCommentText
            )
          }
          user={user}
        />

        <div className="w-full">
          <div className="flex items-start w-full">
            <div
              className="flex w-[90px] cursor-pointer gap-[10px]"
              onClick={handleGoBack}
              role="button"
              aria-label="목록으로 돌아가기"
            >
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
          onConfirm={() => handleDeleteConfirm(setShowDeletePopup)}
          onClose={() => handleDeleteCancel(setShowDeletePopup)}
          isOpen={showDeletePopup}
        />
      )}
    </div>
  );
};

export default Page;
