import React from 'react';

interface BarProps {
  className?: string;
}

const Bar: React.FC<BarProps> = ({ className }) => {
  return (
    <div
      className={`h-[1px] bg-gray-10 flex flex-shrink-0 relative ${className}`}
    />
  );
};

export default Bar;
