import { useState, useEffect } from 'react';
import Image from 'next/image';

interface MemberStatusIconProps {
  icon: string;
  alt: string;
  label: string;
  count: number;
  mobileIcon: string;
}

const MemberStatusIcon = ({
  icon,
  alt,
  label,
  count,
  mobileIcon,
}: MemberStatusIconProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 833);
    };

    checkIsMobile(); // 처음 로드될 때도 체크
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);
  const displayIcon = isMobile && mobileIcon ? mobileIcon : icon;

  return (
    <div className="flex items-center gap-8 max-dt:gap-[21px] max-pad:gap-[5px]">
      <Image
        src={displayIcon}
        alt={alt}
        width={isMobile ? 23 : 113}
        height={isMobile ? 20 : 113}
        className={`${
          isMobile
            ? 'w-[23px] h-[20px]'
            : 'w-[113px] h-[113px] max-pad:w-[100px] max-pad:h-[100px]'
        }`}
        priority
      />
      {isMobile ? (
        <div className="flex items-center gap-1 text-sm font-semibold">
          <span>{label}</span>
          <span>:</span>
          <span>{count}건</span>
        </div>
      ) : (
        <div className="flex flex-col items-center h-[78px]">
          <span className="text-2xl font-semibold h-9">{label}</span>
          <div className="flex h-12 items-center">
            <span className="text-[32px] font-semibold">{count}</span>
            <span className="text-2xl font-semibold relative translate-y-[3.5px]">
              &nbsp;건
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberStatusIcon;
