interface RequirementCardProps {
  title: string;
  description: string;
}

const RequirementCard = ({ title, description }: RequirementCardProps) => {
  return (
    <div className="flex flex-col bg-gray-80/50 w-[328px] h-[158px] pad:w-[384px] pad:h-[170px] px-[20px] pad:px-[40px] py-[32px] gap-[16px] rounded-[16px] justify-center items-center text-center">
      <p className="text-gray-0 text-[20px] pad:text-[24px] font-semibold">
        {title}
      </p>
      <p
        className="text-gray-40 text-[16px] pad:text-[18px] font-medium whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};

export default RequirementCard;
