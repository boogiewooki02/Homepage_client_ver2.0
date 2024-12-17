'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const postId = '1';
  const [postData, setPostData] = useState<PostData>({
    title: '',
    content: '',
    user: '',
    date: '',
    imageUrls: [],
  });

  const [chatCount, setChatCount] = useState(0);
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
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

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axiosInstance.get('/post/notice/1/detail');
        const data = response.data;

        console.log(data);
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
          commentCount={commentCount}
          replyCount={replyCount}
        />

        {/* 댓글 리스트 */}
        <CommentList
          postId={postId}
          onAddReply={(parentCommentId, text) =>
            addCommentOrReply(
              postId,
              replyText,
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

        <CommentInput
          commentText={commentText}
          setCommentText={setCommentText}
          onAddComment={() =>
            addCommentOrReply(
              postId,
              commentText,
              setComments,
              setChatCount,
              setCommentText
            )
          }
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
