interface BorderProps {
  className: string;
}

const TopRightRoundBorder = ({ className }: BorderProps) => {
  return (
    <div
      className={`w-[48px] h-[48px] pad:w-[68px] pad:h-[68px] rounded-tr-full bg-gray-90/0 border-gray-0 border-t-[16px] border-r-[16px] pad:border-t-[20px] pad:border-r-[20px] border-l-0 border-b-0 z-10 ${className}`}
    />
  );
};

export default TopRightRoundBorder;
