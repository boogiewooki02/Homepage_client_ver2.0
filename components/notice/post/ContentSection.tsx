// ContentSection.tsx
import React from 'react';

interface ContentSectionProps {
  text: string;
  imageUrls: string[] | null;
}

const ContentSection: React.FC<ContentSectionProps> = ({ text, imageUrls }) => {
  return (
    <>
      <div className="font-pretendard text-xl font-medium whitespace-pre-wrap">
        {text}
      </div>

      {imageUrls && imageUrls.length > 0 && (
        <div className="mt-4 flex overflow-x-auto gap-6">
          {imageUrls.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`content-image-${index}`}
              className="w-[300px] h-[400px] object-cover rounded-xl"
            />
          ))}
        </div>
      )}
      <div className="w-full border-b border-gray-15" />
    </>
  );
};

export default ContentSection;
