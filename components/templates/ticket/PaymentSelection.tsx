import { SelectBox } from '@/components/ui/selectBox';

const PaymentSelection = () => {
  return (
    <div className="flex flex-col mt-10 mb-10 w-full px-4 pad:px-12">
      <div className="flex h-[30px]">
        <div className="font-semibold text-lg pad:text-xl leading-[30px] text-gray-90">
          결제 방법 선택
        </div>
      </div>
      <div className="flex flex-col mt-6">
        <SelectBox name="계좌이체" state alt="PaymentSelection" disabled />
      </div>
    </div>
  );
};

export default PaymentSelection;
