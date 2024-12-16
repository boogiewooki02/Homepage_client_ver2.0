import InfoList from '@/components/templates/admin/Info';
import { InputFieldType } from './type';

interface TicketInfoProps {
  data: any;
  fieldList: InputFieldType[];
  onChange: (newValue: number, title: string) => void;
  children: React.ReactNode;
}

const TicketInfoList: React.FC<TicketInfoProps> = ({
  data,
  fieldList,
  onChange,
  children,
}) => {
  return (
    <div className="flex flex-row w-full h-auto gap-[8px]">
      <p className="flex w-[120px] pad:w-[160px] h-[48px] items-center">
        {children}
      </p>
      <InfoList data={data} fieldList={fieldList} onChange={onChange} />
    </div>
  );
};

export default TicketInfoList;
