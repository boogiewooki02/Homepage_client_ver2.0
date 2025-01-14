import { authInstance } from '@/api/auth/axios';
import React, { useEffect, useRef, useState } from 'react';

interface ImageUploadProps {
  image: string[];
  setImage: React.Dispatch<React.SetStateAction<string[]>>;
  isEditMode: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  image,
  setImage,
  isEditMode,
}) => {
  const [images, setImages] = useState<string[]>(image);
  const [hasScrollbar, setHasScrollbar] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
    }
  };

  const uploadImageToS3 = async (file: File) => {
    try {
      // Presigned URL 요청
      const { data } = await authInstance.post('/image/presigned-url', {
        imageName: file.name,
      });
      const presignedUrl = data;
      const uploadResponse = await fetch(presignedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type, // 파일의 MIME 타입
        },
        body: file, // 업로드할 파일
      });

      if (!uploadResponse.ok) {
        throw new Error(`S3 업로드 실패: ${uploadResponse.statusText}`);
      }

      // 성공적으로 업로드된 URL 반환
      return presignedUrl.split('?')[0]; // URL에서 쿼리 문자열 제거
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드 중 문제가 발생했습니다.');
      return null;
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      const uploadedUrls = await Promise.all(
        Array.from(files).map(async (file) => {
          const uploadedUrl = await uploadImageToS3(file);
          return uploadedUrl;
        })
      );
      const validUrls = uploadedUrls.filter(
        (url): url is string => url !== null
      );

      // 자식 컴포넌트 상태 업데이트
      setImages((prevImages: string[]) => {
        const updatedImages = [...prevImages, ...validUrls];
        return updatedImages;
      });

      // 부모 상태 업데이트
      setImage((prevImages: string[]): string[] => {
        const updatedImages = [...prevImages, ...validUrls];
        return updatedImages;
      });
    }
    setTimeout(() => {
      scrollToRight();
    }, 100);
  };

  // 이미지 삭제
  const handleImageDelete = (index: number) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index);
      setImage(updatedImages);
      return updatedImages;
    });

    setTimeout(() => {
      scrollToRight();
    }, 100);
  };

  // 이미지가 추가되거나 삭제될 때마다 부모 컴포넌트에 전달
  useEffect(() => {
    if (isEditMode) {
      setImages(image); // 수정 모드일 때 부모로부터 전달받은 이미지를 사용
    }
  }, [isEditMode, image]);

  return (
    <div className="mb-10">
      <p className="text-gray-90 text-[20px] font-[400] leading-normal pad:mb-2 ph:mb-4">
        첨부파일 업로드<span className="ml-2">({images.length}/5)</span>
      </p>

      {/* container */}
      <div
        ref={containerRef}
        className="mt-2 overflow-x-auto w-full image-upload-scrollbar"
      >
        <div
          className={`flex ${
            images.length === 0 ? 'justify-center' : 'space-x-4'
          } ${hasScrollbar ? 'pb-[10px]' : ''}`}
        >
          {/* 이미지 */}
          {images.map((image, index) => (
            <div
              key={index}
              className="relative pad:h-[400px] ph:h-[328px] rounded-[12px] flex justify-center items-center overflow-hidden flex-shrink-0 group"
            >
              <img
                src={image}
                alt={`uploaded-${index}`}
                className="w-auto h-full object-cover rounded-[11px] transition duration-200 ease-in-out group-hover:blur-sm"
              />

              {/* Hover 시 blur 및 삭제 버튼 */}
              <div className="absolute top-0 left-0 h-full w-full pad:h-[400px] ph:h-[328px] bg-[black]/50 rounded-[11px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <button
                  onClick={() => handleImageDelete(index)}
                  className="w-8 h-8 rounded-full bg-danger-40 text-[white] text-[24px] font-[500] flex items-center justify-center mb-1"
                >
                  -
                </button>
              </div>
            </div>
          ))}

          {/* 추가 버튼 box */}
          {images.length < 5 && (
            <label
              className="pad:w-[400px] ph:w-[328px] pad:h-[400px] ph:h-[328px] rounded-[12px] flex justify-center items-center cursor-pointer flex-shrink-0"
              style={{ boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 1)' }}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div
                className="w-8 h-8 rounded-full bg-gray-10 flex justify-center items-center"
                style={{ boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)' }}
              >
                <span className="text-gray-0 text-[24px] font-[500] leading-normal pb-1">
                  +
                </span>
              </div>
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
