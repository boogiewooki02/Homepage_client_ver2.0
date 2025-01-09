'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import CommunityRule from '@/components/announcement/posting/CommunityRule';
import ContentInput from '@/components/announcement/posting/ContentInput';
import ImageUpload from '@/components/announcement/posting/ImageUpload';
import TitleInput from '@/components/announcement/posting/TitleInput';
import TopButtons from '@/components/announcement/posting/TopButtons';
import { authInstance } from '@/api/auth/axios';

const PageContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const title = searchParams?.get('title') || '';
  const content = searchParams?.get('content') || '';
  const imageUrls = searchParams?.getAll('imageUrls') || [];
  const toggle = searchParams.get('toggle');

  const [currentTitle, setTitle] = useState(title || '');
  const [currentContent, setContent] = useState(content || '');
  const [currentImages, setCurrentImages] = useState(
    imageUrls.length > 0 ? imageUrls : []
  );

  const isEditMode = title !== null;
  const isPostActive =
    currentTitle.trim() !== '' && currentContent.trim() !== '';

  // 글 수정 API 추가
  const onPublish = async () => {
    const POST_TYPES = {
      NOTICE: 'NOTICE',
      KAHLUA_TIME: 'KAHLUA_TIME',
    };

    const postType =
      toggle === '공지사항' ? POST_TYPES.NOTICE : POST_TYPES.KAHLUA_TIME;

    const postData = {
      title: currentTitle,
      content: currentContent,
      imageUrls: currentImages,
      postType,
    };

    try {
      const response = await authInstance.post('/post/notice/create', postData);
      const postId = response.data.result.id;
      router.push(`/announcement/post/${postId}`);
    } catch (error) {
      console.error('게시물 업로드 실패:', error);
    }

    // 초기화
    setTitle('');
    setContent('');
    setCurrentImages([]);
  };

  return (
    <div className="relative flex flex-col items-center mt-[96px] mb-[-160px] font-pretendard">
      <section className="dt:w-[1200px] pad:w-[786px] ph:w-[328px] dt:pb-[578px] pad:pb-[559px] ph:pb-[171px]">
        <TopButtons isPostActive={isPostActive} onPublish={onPublish} />
        <TitleInput title={currentTitle} setTitle={setTitle} />
        <ContentInput content={currentContent} setContent={setContent} />

        <ImageUpload
          image={currentImages}
          setImage={setCurrentImages}
          isEditMode={isEditMode}
        />

        <CommunityRule />
      </section>
    </div>
  );
};

export default PageContent;
