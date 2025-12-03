import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from 'next/link';

import ApplicantStatistics from './applicant/ApplicantStatistics';
import MessageStatistics from './message/MessageStatistics';
import TicketStatistics from './ticketing/TicketStatistics';

interface AdminPageButtonProps {
  name: string;
  url: string;
}

const AdminPageButton = ({ name, url }: AdminPageButtonProps) => {
  return (
    <div className="w-full">
      <Link href={url}>
        <div
          className={`flex flex-row w-full py-[20px] pl-[40px] pr-[16px] text-gray-0 bg-gray-80 justify-center items-center h-[76px] ${
            name === '지원 현황' ||
            name === '공연 예매 현황' ||
            name === '문자 전송'
              ? 'rounded-t-[24px]'
              : 'rounded-[24px]'
          }`}
        >
          <span className="w-full text-[24px]">{name}</span>
          <ArrowForwardIosIcon />
        </div>
      </Link>
      {name === '지원 현황' && <ApplicantStatistics />}
      {name === '공연 예매 현황' && <TicketStatistics />}
      {name === '문자 전송' && <MessageStatistics />}
    </div>
  );
};

export default AdminPageButton;
