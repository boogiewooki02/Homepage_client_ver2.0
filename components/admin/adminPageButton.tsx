import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ApplicantStatistics from './applicant/ApplicantStatistics';
import TicketStatistics from './ticketing/TicketStatistics';
import Link from 'next/link';

interface urlProps {
  name: string;
  url: string;
}

const AdminPageButton: React.FC<urlProps> = ({ name, url }) => {
  return (
    <div>
      <div
        className={`flex flex-row w-full py-[20px] pl-[40px] pr-[16px] text-gray-0 bg-gray-80 justify-center items-center h-[76px] ${
          name === '지원 현황' || name === '공연 예매 현황'
            ? 'rounded-t-[24px]'
            : 'rounded-[24px]'
        }`}
      >
        <span className="w-full text-[24px]">{name}</span>
        <Link href={url}>
          <ArrowForwardIosIcon />
        </Link>
      </div>
      {name === '지원 현황' && <ApplicantStatistics />}
      {name === '공연 예매 현황' && <TicketStatistics />}
    </div>
  );
};

export default AdminPageButton;
