'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import CommentList from '@/components/notice/CommentList';
import Image from 'next/image';
import arrow from '@/public/image/notice/Left.svg';
import DeletePopup from '@/components/notice/DeletePostPopup';
import CommentInput from '@/components/notice/CommentInput';
import Post from '@/components/notice/Post';
import {
  addCommentOrReply,
  handleDeleteCommentOrReply,
  handleDeleteCancel,
  handleDeleteConfirm,
} from '@/components/util/noticeUtils';
import { authInstance } from '@/api/auth/axios';
import { Comment as CommentType } from '@/components/notice/dto';

interface PostData {
  title: string;
  content: string;
  user: string;
  date: string;
  imageUrls: string[];
  likes: number;
  id: number;
  liked: boolean;
}

const Page = () => {
  const router = useRouter();
  const { id } = useParams();
  const numPostId = Number(id);
  const [postData, setPostData] = useState<PostData>({
    title: '',
    content: '',
    user: '',
    date: '',
    imageUrls: [],
    likes: 0,
    id: 0,
    liked: false,
  });

  const [comments, setComments] = useState<CommentType[]>([]);
  const [validCommentCount, setValidCommentCount] = useState<number>(0);
  const [commentText, setCommentText] = useState('');
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [user, setUser] = useState<string>('');
  const [shouldFetch, setShouldFetch] = useState(false);

  const fetchComments = async () => {
    try {
      const response = await authInstance.get(`/comment/${id}/list`);
      const processedComments = response.data.result.comments.map(
        (comment: CommentType) => ({
          ...comment,
          content: comment.deletedAt ? '삭제된 댓글입니다.' : comment.content,
          replies: comment.replies
            ? comment.replies.filter((reply: CommentType) => !reply.deletedAt)
            : [],
        })
      );

      setComments(processedComments);
      setValidCommentCount(
        processedComments.filter(
          (c: CommentType) => c.content !== '삭제된 댓글입니다.'
        ).length
      );
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await authInstance.get(`/post/notice/${id}/detail`);
        const data = response.data.result;
        const imageUrls = Array.isArray(data.imageUrls)
          ? data.imageUrls.map((img: { id: number; url: string }) => img.url)
          : typeof data.imageUrls === 'string'
            ? data.imageUrls.split(',')
            : [];
        setPostData({ ...data, imageUrls });
      } catch (error) {
        console.error('Error fetching post data', error);
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await authInstance.get(`/user`);
        setUser(response.data.result.name);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchPostData();
    fetchUserData();
    fetchComments();
  }, []);

  useEffect(() => {
    if (shouldFetch) {
      fetchComments();
      setShouldFetch(false);
    }
  }, [shouldFetch, id]);

  useEffect(() => {
    setValidCommentCount(
      comments.filter((c) => c.content !== '삭제된 댓글입니다.').length
    );
  }, [comments]);

  const handleAddReply = async (parentCommentId: string, text: string) => {
    await addCommentOrReply(
      numPostId,
      text,
      user,
      setComments,
      setValidCommentCount,
      setReplyText,
      parentCommentId
    );
    setShouldFetch(true);
  };

  const handleAddComment = async () => {
    await addCommentOrReply(
      numPostId,
      commentText,
      user,
      setComments,
      setValidCommentCount,
      setCommentText
    );
    setShouldFetch(true);
  };

  const handleGoBack = () => {
    router.push('/announcement');
  };

  const getReplyCount = (comments: CommentType[]): number => {
    return comments.reduce((count, comment) => {
      const replyCount = comment.replies ? comment.replies.length : 0;
      return count + replyCount + getReplyCount(comment.replies || []);
    }, 0);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center pt-16 w-full max-w-[500px] pad:max-w-[786px] dt:max-w-[1200px] max-pad:px-[16px]">
        <Post
          noticeData={postData}
          postId={numPostId}
          commentCount={validCommentCount}
          replyCount={getReplyCount(comments)}
          currentUser={user}
        />

        <CommentList
          postId={numPostId}
          user={user}
          comments={comments}
          onAddReply={handleAddReply}
          onDeleteComment={(id) =>
            handleDeleteCommentOrReply(
              id,
              numPostId,
              setComments,
              setValidCommentCount
            )
          }
          onDeleteReply={(replyId) =>
            handleDeleteCommentOrReply(
              replyId,
              numPostId,
              setComments,
              setValidCommentCount
            )
          }
          currentUser={user}
        />

        <CommentInput
          commentText={commentText}
          setCommentText={setCommentText}
          onAddComment={handleAddComment}
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
