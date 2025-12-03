import * as React from 'react';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  checked: boolean;
  onChange: (value: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, children, checked, onChange, ...props }) => {
    const id = React.useId();

    return (
      <label className="flex flex-row justify-start">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={({ target: { checked } }) => onChange(checked)}
          className={`"accent-primary-50 w-[24px] h-[24px] sm:w-[18px] sm:h-[18px] flex-shrink-0" ${className}`}
          {...props}
        />
        <div className="text-gray-60 text-[18px] pl-4">{children}</div>
      </label>
    );
  }
);
Checkbox.displayName = 'Checkbox';

export { Checkbox };
