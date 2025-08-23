'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

import defaultProfileImg from '@/public/image/mypage/defaultProfile.svg';
import ImageUploadButton from '@/public/image/mypage/imgPlusButton.svg';

import {
  getProfileImage,
  getUserInfo,
  patchProfileImage,
} from '@/api/user/user';
import { getPresignedUrl } from '@/api/s3/s3';
import { uploadImageToS3 } from '@/utils/uploadImageToS3';

interface UserProps {
  name: string;
  term: number;
  session: string;
}

const sessionMapping: Record<string, string> = {
  VOCAL: '보컬',
  BASS: '베이스',
  GUITAR: '기타',
  DRUM: '드럼',
  SYNTHESIZER: '신디',
  MANAGER: '매니저',
};

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState<UserProps>({
    name: '',
    term: 0,
    session: '',
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getUserInfo();
        setUserInfo({
          name: data.name ?? '',
          term: data.term ?? 0,
          session: sessionMapping[data.session] ?? data.session ?? '',
        });

        const url = await getProfileImage();
        setProfileImage(url || null);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    try {
      const { presignedUrl, imageUrl } = await getPresignedUrl(file.name);
      await uploadImageToS3(presignedUrl, file);
      await patchProfileImage(imageUrl);
      setProfileImage(imageUrl);
    } catch (err) {
      console.error(err);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <section className="w-full h-[148px] pad:h-[260px] bg-gray-5 flex items-center py-8 pad:py-16">
      <div className="w-full px-6 pad:px-0 pad:w-[786px] dt:w-[1200px] flex justify-between mx-auto gap-8">
        <div className="flex my-auto gap-4 pad:my-0 pad:flex-row flex-col w-full pad:justify-between items-start self-stretch">
          <h1 className="text-gray-90 pad:text-[64px] leading-[100%] text-[36px] font-semibold">
            My Page
          </h1>
          <div className="flex justify-end items-end pad:self-stretch gap-2 font-semibold">
            <div className="flex items-center gap-2">
              <p className="text-gray-90 text-2xl">{userInfo.name}</p>
              <div className="flex text-primary-50 text-[22px] gap-1">
                <p>{userInfo.term}기</p>
                <p>{userInfo.session}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative pad:w-[174px] pad:h-[174px] w-[100px] h-[100px]">
            <label
              className="cursor-pointer rounded-full w-full h-full block relative"
              onClick={openFilePicker}
              aria-label="프로필 이미지 변경"
            >
              <Image
                src={profileImage || defaultProfileImg}
                alt="user-profile"
                fill
                sizes="(max-width: 768px) 100px, 174px"
                className="object-cover rounded-full"
                priority
              />
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            <button
              type="button"
              onClick={openFilePicker}
              className="absolute bottom-0 right-[-6.82px] pad:w-[50px] pad:h-[50px] w-[30px] h-[30px] "
              aria-label="프로필 이미지 업로드"
            >
              <Image
                src={ImageUploadButton}
                alt="image-upload"
                fill
                sizes="(max-width: 768px) 40px, 50px"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
