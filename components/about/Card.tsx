import Image from 'next/image';
import React from 'react';

interface CardProps {
  bgColor: string;
  title1: string;
  title2: string;
  width: string;
  height: string;
  descriptions: {
    default: string[];
    phone: string[];
  };
  imageSrc: string;
  altText: string;
}

const Card = ({
  bgColor,
  title1,
  title2,
  width,
  height,
  descriptions,
  imageSrc,
  altText,
}: CardProps) => {
  return (
    <div className="pad:w-96 ph:w-[304px] pad:h-[470px] ph:h-[364px] pad:mx-0 ph:ml-4 rounded-3xl">
      <div className="flex">
        <div
          className={`pad:w-[282px] ph:w-[202px] h-[102px] rounded-t-3xl ${bgColor} text-gray-0`}
        >
          <p className="pad:mt-8 pad:ml-8 ph:mt-6 ph:ml-6 pad:text-[32px] ph:text-[24px] font-semibold leading-[150%]">
            <span>{title1}</span>
            <br />
            <span>{title2}</span>
          </p>
        </div>
        <div className={`w-[102px] h-[102px] ${bgColor} relative`}>
          <div className="w-[102px] h-[102px] rounded-bl-3xl absolute bg-gray-0">
            <div className="w-[78px] h-[78px] absolute bg-gray-5 ml-6 mb-6 rounded-3xl flex justify-center items-center">
              <Image
                src={imageSrc}
                className="w-12 h-12"
                alt={altText}
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`pad:w-96 ph:w-[304px] pad:h-[368px] ph:h-[262px] flex flex-col items-center rounded-r-3xl rounded-bl-3xl ${bgColor} text-gray-0`}
      >
        <div className="flex-grow" />
        <p
          className={`${width} ${height} ph:h-36 pad:mb-8 ph:mb-6 pad:text-lg ph:text-base font-medium leading-[150%]`}
        >
          <span className="pad:block ph:hidden">
            {descriptions.default.map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </span>
          <span className="pad:hidden ph:block">
            {descriptions.phone.map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Card;
