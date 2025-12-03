import { forwardRef } from 'react';

interface AdminButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const AdminButton = forwardRef<HTMLButtonElement, AdminButtonProps>(
  ({ className = '', type = 'button', children, ...rest }, ref) => {
    return (
      <button
        {...rest}
        type={type}
        ref={ref}
        className={`w-full pad:w-[282px] h-[60px] bg-gray-10 rounded-[12px] text-gray-0 text-[18px] font-normal flex items-center justify-center ${className}`}
      >
        {children}
      </button>
    );
  }
);

AdminButton.displayName = 'AdminButton';

export default AdminButton;
