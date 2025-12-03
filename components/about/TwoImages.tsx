'use client';

import { StaticImageData } from 'next/image';
import React from 'react';

import OneImage from './OneImage';

interface TwoImagesProps {
  className?: string;
  images: {
    width: string;
    height: string;
    imageSrc: StaticImageData;
    altText: string;
  }[];
}

const TwoImages = ({ className = '', images }: TwoImagesProps) => {
  return (
    <div className={`${className}`}>
      {images.map((image, index) => (
        <OneImage
          key={index}
          width={image.width}
          height={image.height}
          imageSrc={image.imageSrc}
          altText={image.altText}
        />
      ))}
    </div>
  );
};
export default TwoImages;
