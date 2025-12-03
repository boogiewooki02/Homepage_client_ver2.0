interface ScheduleCardProps {
  title: string;
  period: string;
  description: string;
  titleClassName: string;
  desClassName: string;
}

const ScheduleCard = ({
  title,
  period,
  description,
  titleClassName,
  desClassName,
}: ScheduleCardProps) => {
  return (
    <div
      className={`flex flex-col bg-gray-80/50 w-[282px] h-[196px] p-[24px] rounded-[16px] justify-center items-start text-left ${titleClassName}`}
    >
      <p className="text-gray-0 text-[32px] font-semibold">{title}</p>
      <p className="text-gray-0 text-[20px] font-medium">{period}</p>
      <p
        className={`text-gray-40 text-[18px] font-medium mt-4 ${desClassName}`}
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};

export default ScheduleCard;
