'use client';

import ErrorModal from '@/components/login/ErrorModal';
import { useState } from 'react';

const page = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div className="h-screen flex justify-center items-center">
      <ErrorModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
};

export default page;
