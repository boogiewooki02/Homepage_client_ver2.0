'use client';

import React, { useEffect, useState } from 'react';

import ContributorCardList from '@/components/contributors/ContributorCardList';
import Title from '@/components/contributors/Title';

const Page = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(true);
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative flex flex-col mb-[-160px] dt:mb-[-194px]">
      {isScrolled && (
        <div className="flex w-full h-[64px] fixed z-10 blur-lg backdrop-blur-sm top-0" />
      )}
      <Title />
      <ContributorCardList />
    </div>
  );
};

export default Page;
