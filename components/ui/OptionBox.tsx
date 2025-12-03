interface OptionBoxProps {
  option: string;
  isDays: boolean;
}

const OptionBox = ({ option, isDays }: OptionBoxProps) => {
  return (
    <div
      className={`mt-5 flex items-center justify-center w-[230px] dt:w-[352px] h-14 border rounded-xl text-[16px] font-normal leading-6 text-center
        ${isDays ? 'bg-gray-0 text-primary-50 border-primary-50' : 'bg-gray-05 text-gray-40 border-none'}`}
    >
      {option}
    </div>
  );
};

export default OptionBox;
