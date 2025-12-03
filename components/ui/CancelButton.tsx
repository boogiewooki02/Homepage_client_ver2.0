import { forwardRef } from 'react';

export interface CancelButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const CancelButton = forwardRef<HTMLButtonElement, CancelButtonProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <button
        {...rest}
        ref={ref}
        className={`flex h-[59px] w-full pad:w-[180px] rounded-b-3xl pad:rounded-xl justify-center pad:px-14 py-4 font-medium leading-6 text-[18px] text-gray-0 bg-danger-40 ${className}`}
      >
        {props.children}
      </button>
    );
  }
);

CancelButton.displayName = 'CancelButton';

export { CancelButton };
