import PieChart from './PieChart';
const ApplicantStatics = () => {
  return (
    <div className="w-full h-auto gap-6 rounded-b-[24px] bg-gray-5">
      <span className="text-[18px] font-semibold text-gray-900">
        지원자 통계
      </span>
      <span></span>
      <PieChart />
    </div>
  );
};

export default ApplicantStatics;
