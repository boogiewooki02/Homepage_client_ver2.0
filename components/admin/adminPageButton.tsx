import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ApplicantStatics from './applicant/ApplicantStatics';
import Link from 'next/link';

interface urlProps {
  name: string;
  url: string;
}

const AdminPageButton: React.FC<urlProps> = ({ name, url }) => {
  return (
    <div>
      <div
        className={`flex flex-col w-full h-full py-[20px] px-[16px] text-gray-0 bg-gray-80 ${
          name === '지원 현황' ? 'rounded-t-[24px]' : 'rounded-[24px]'
        } justify-center items-center gap-[10px]`}
      >
        <div className="flex flex-row w-full h-full justify-between items-center">
          <span className="w-full">{name}</span>
          <Link href={url}>
            <ArrowForwardIosIcon />
          </Link>
        </div>
      </div>
      {name === '지원 현황' && <ApplicantStatics />}
    </div>
  );
};

export default AdminPageButton;
