import { useCallback } from 'react';

import Date from '@/components/ui/admin/Date';
import DateTime from '@/components/ui/admin/DateTime';
import Text from '@/components/ui/admin/TextBox';
import { InputFieldType } from '@/components/ui/admin/type';

interface AdminInfoProps {
  data: Record<string, any>;
  fieldList: InputFieldType[];
  onChange: (newValue: any, label: string) => void;
}

// title, inputBox 형식의 information list
const InfoList = ({ data, fieldList, onChange }: AdminInfoProps) => {
  const handleChange = useCallback(
    (newValue: any, field: InputFieldType) => {
      onChange(newValue, field.label);
    },
    [onChange]
  );

  return (
    <div className="flex flex-col gap-[16px] w-full">
      {fieldList.map((field: InputFieldType) => {
        const { label, title } = field;
        return (
          <div key={label}>
            <div className="flex flex-col pad:flex-row gap-2 w-full">
              <div className="flex items-center w-[160px] h-[30px] pad:h-12">
                {title}
              </div>
              {renderInput(field, data[label], handleChange)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// type에 맞는 input box 불러오기
function renderInput(
  field: InputFieldType,
  value: any,
  onChange: (newValue: any, field: InputFieldType) => void
) {
  const components: { [key: string]: React.ComponentType<any> } = {
    text: Text,
    datetime: DateTime,
    date: Date,
  };

  const Component = components[field.type];

  return Component ? (
    <Component
      field={field}
      value={value}
      onChange={(newValue: any) => onChange(newValue, field)}
    />
  ) : (
    <div>정의되지 않은 타입</div>
  );
}

export default InfoList;
