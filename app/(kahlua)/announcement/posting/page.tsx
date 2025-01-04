'use client';

import React, { Suspense } from 'react';
import PageContent from '@/components/announcement/posting/PageContent';

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
};

export default Page;
