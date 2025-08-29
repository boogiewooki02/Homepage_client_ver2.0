'use client';
import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Skeleton from './Skeleton';

interface OneImageProps {
  imageSrc: StaticImageData;
  altText: string;
  width: string;
  height: string;
}

const OneImage: React.FC<OneImageProps> = ({
  imageSrc,
  altText,
  width,
  height,
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <div
      className={`relative rounded-3xl ${width} ${height} overflow-hidden pad:ml-0 ph:ml-4`}
    >
      {loading && <Skeleton />}
      <Image
        src={imageSrc}
        alt={altText}
        fill
        sizes="384px"
        priority
        unoptimized
        onLoad={() => setLoading(false)}
        style={{ display: loading ? 'none' : 'block', objectFit: 'cover' }}
      />
    </div>
  );
};
export default OneImage;
