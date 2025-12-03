interface InputProps {
  data: string;
  setData: React.Dispatch<React.SetStateAction<string>>;
}

const NameInput = ({ data, setData }: InputProps) => (
  <div className="flex flex-row w-[200px] h-[48px] px-[20px] py-[10px] justify-center items-center gap-[24px] rounded-[12px] bg-black">
    <p className="text-primary-50">이름</p>
    <input
      type="text"
      value={data}
      onChange={(e) => setData(e.target.value)}
      className="w-full bg-black border-none outline-none shadow-none appearance-none text-gray-0"
    />
  </div>
);

export default NameInput;
