import Image from 'next/image';
import React, { useState } from 'react';

import { InputFieldType } from './type';

import { getPresignedUrl } from '@/api/s3/s3';

interface ImageProps {
  data: { [key: string]: string };
  field: InputFieldType;
  onChange: (newValue: string, label: string) => void;
}

function ImageBox({ data, field, onChange }: ImageProps) {
  const { label } = field;
  const [previewImage, setPreviewImage] = useState<string>(data[label] || '');
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setPreviewImage(localUrl);

    try {
      setUploading(true);
      const { presignedUrl, imageUrl } = await getPresignedUrl(file.name);
      await fetch(presignedUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      });
      onChange(imageUrl, label);
    } catch (err) {
      console.error('이미지 업로드 실패:', err);
      alert('이미지 업로드에 실패했습니다.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <label
      key={label}
      className="flex h-[438px] pad:h-[400px] w-[328px] pad:w-[300px] pad:min-h-[400px] pad:min-w-[300px] rounded-[12px] justify-center items-center border-gray-40 border cursor-pointer relative"
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
      {previewImage ? (
        <Image
          src={previewImage}
          alt={`uploaded-${label}`}
          fill
          className="object-cover rounded-[11px] transition duration-200 ease-in-out"
          sizes="100%"
        />
      ) : (
        <span className="text-gray-40 text-sm">이미지 업로드</span>
      )}
      {uploading && (
        <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-60 flex items-center justify-center text-gray-70 text-sm">
          업로드 중...
        </div>
      )}
    </label>
  );
}

export default ImageBox;
