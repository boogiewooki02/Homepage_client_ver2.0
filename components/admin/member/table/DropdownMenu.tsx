import { Portal } from '@mui/material';
import { forwardRef } from 'react';

interface DropdownMenuProps {
  isOpen: boolean;
  options: string[];
  position: { top: number; left: number };
  onSelect: (userType: string) => void;
}

const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ isOpen, options, position, onSelect }, ref) => {
    if (!isOpen) return null;

    return (
      <Portal>
        <div
          ref={ref}
          className="font-semibold text-2xl max-dt:text-[20px] max-pad:text-sm flex flex-col items-center justify-around absolute top-full mt-2 w-[164px] h-[120px] max-dt:w-[136px] max-pad:w-[100px] max-pad:h-[73px] bg-gray-0 border-[3px] rounded-[10px] z-50"
          style={{
            top: position.top,
            left: position.left,
            transform: 'translateX(-50%)',
          }}
        >
          {options.map((userType, i, arr) => (
            <div
              key={userType}
              className={`flex items-center justify-center w-full text-center cursor-pointer
                ${i === 0 ? 'hover:rounded-t-[6px]' : ''}
                ${i === arr.length - 1 ? 'h-[36px] border-b-0 hover:rounded-b-[6px] hover:border-b-0' : 'h-[39px] border-b-[3px] hover:border-b-[3px]'}
                hover:bg-primary-10 hover:text-gray-0 border-gray-90`}
              onClick={() => onSelect(userType)}
            >
              {userType}
            </div>
          ))}
        </div>
      </Portal>
    );
  }
);

DropdownMenu.displayName = 'DropdownMenu';

export default DropdownMenu;
