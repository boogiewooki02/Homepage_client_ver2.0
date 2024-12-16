import React, { useEffect, useRef, useState } from 'react';
import { InputFieldType } from './type';

interface ImageProps {
  data: { [key: string]: string };
  field: InputFieldType;
  onChange: (newValue: string, label: string) => void;
}

const ImageBox: React.FC<ImageProps> = ({ data, field, onChange }) => {
  const { label } = field;
  const [previewImage, setPreviewImage] = useState<string>(data[label] || '');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const newImage = URL.createObjectURL(files[0]);
      setPreviewImage(newImage);
      onChange(newImage, label);
    }
  };

  return (
    <label
      key={label}
      className="flex h-[438px] pad:h-[400px] w-[328px] pad:w-[300px] rounded-[12px] justify-center items-center border-gray-40 border cursor-pointer"
    >
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
      <img
        src={previewImage}
        alt={`uploaded-${label}`}
        className="w-auto h-full object-cover rounded-[11px] transition duration-200 ease-in-out group-hover:blur-sm"
      />
    </label>
  );
};

export default ImageBox;
