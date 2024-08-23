import Image from 'next/image';

interface SessionProps {
  session: string;
  image: string;
}

const SessionCard: React.FC<SessionProps> = ({ session, image }) => {
  return (
    <div className="flex flex-col bg-gray-80/50 w-[156px] pad:w-[224px] h-auto p-[32px] gap-[16px] rounded-[16px] justify-center items-center text-center">
      <p className="text-gray-0 text-[18px] pad:text-[22px] font-medium">
        {session}
      </p>
      <div className="relative h-[80px] w-[80px] pad:h-[120px] pad:w-[120px]">
        <Image src={image} sizes="100vw" alt={session} />
      </div>
    </div>
  );
};

export default SessionCard;
