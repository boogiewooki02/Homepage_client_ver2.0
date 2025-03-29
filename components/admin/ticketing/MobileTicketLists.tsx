import { useEffect, useState } from 'react';
import { authInstance } from '@/api/auth/axios';
import { Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface TicketMemberProps {
  id: number;
  name: string;
  phone_num: string;
}

interface TicketProps {
  id: number;
  status: string;
  reservation_id: string;
  buyer: string;
  phone_num: string;
  total_ticket: number;
  major: string | null;
  studentId?: string;
  meeting: string | null;
  members: TicketMemberProps[] | null;
}

const MobileTicketLists = ({
  ticketData,
  ticketState,
  handleChange,
  handleSelectedState,
}: {
  ticketData: TicketProps[];
  ticketState: Record<number, string>;
  handleChange: (
    e: React.ChangeEvent<HTMLSelectElement>,
    ticketId: number
  ) => void;
  handleSelectedState: (ticketId: number) => void;
}) => {
  const [openCardIds, setOpenCardIds] = useState<number[]>([]);
  const router = useRouter();

  const formatPhoneNumber = (raw: string) => {
    const numbersOnly = raw.replace(/\D/g, '');
    if (numbersOnly.length === 11) {
      return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 7)}-${numbersOnly.slice(7)}`;
    } else if (numbersOnly.length === 10) {
      return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 6)}-${numbersOnly.slice(6)}`;
    } else {
      return raw;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('복사되었습니다!');
    });
  };

  const toggleCard = (id: number) => {
    setOpenCardIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col mt-4 w-full max-w-[500px]">
      {ticketData.map((ticket) => (
        <div
          key={ticket.id}
          className="w-full flex flex-col px-4 py-5 gap-3 border-t-[1px] border-gray-5"
        >
          {/* 상단 요약 영역 */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <Typography
                component="div"
                className={`text-center text-base font-semibold px-3 py-1 rounded-[96px] ${
                  ticket.status === 'FINISH_PAYMENT'
                    ? 'text-primary-50 bg-[rgba(221,226,253,0.5)]'
                    : ticket.status === 'WAIT'
                      ? 'text-gray-30 bg-gray-5'
                      : ticket.status === 'CANCEL_REQUEST'
                        ? 'text-danger-40 bg-[rgba(252,227,227,0.5)]'
                        : 'text-gray-30 bg-gray-5'
                }`}
              >
                {ticket.status === 'FINISH_PAYMENT'
                  ? '결제 완료'
                  : ticket.status === 'WAIT'
                    ? '결제 대기'
                    : ticket.status === 'CANCEL_REQUEST'
                      ? '취소 요청'
                      : '예매 취소'}
              </Typography>
              <div className="text-gray-30 font-medium">
                {ticket.reservation_id}
              </div>
            </div>
            {/* 토글 버튼 */}
            <button onClick={() => toggleCard(ticket.id)}>
              <Image
                src="/image/admin/arrowUp.svg"
                width={20}
                height={20}
                alt="toggle"
                className={`transition-transform duration-300 ${
                  openCardIds.includes(ticket.id) ? '-rotate-90' : 'rotate-90'
                }`}
              />
            </button>
          </div>

          {/* 기본 정보 */}
          <div className="flex gap-[6px] items-center">
            <span className="text-lg text-gray-80 font-semibold">
              {ticket.buyer}
            </span>
            <span className="text-md text-primary-50">
              {ticket.total_ticket}장
            </span>
          </div>
          <span className="text-sm text-gray-40">
            {formatPhoneNumber(ticket.phone_num)}
          </span>

          {/* 펼쳐진 상세 내용 */}
          {openCardIds.includes(ticket.id) && (
            <div className="flex flex-col gap-4 mt-2">
              {/* 동반인 */}
              {ticket.members?.map((member) => (
                <div
                  key={member.id}
                  className="flex flex-col gap-1 px-4 py-2 rounded-xl bg-gray-5 text-sm text-gray-60"
                >
                  <div className="font-medium">동반인</div>
                  <div>이름: {member.name}</div>
                  <div className="flex justify-between items-center">
                    <span>전화번호: {formatPhoneNumber(member.phone_num)}</span>
                    <Image
                      src="/image/ticket/copy.svg"
                      width={18}
                      height={18}
                      alt="copy"
                      className="cursor-pointer"
                      onClick={() => copyToClipboard(member.phone_num)}
                    />
                  </div>
                </div>
              ))}

              {/* 결제 상태 변경 */}
              <div className="flex gap-3 mt-2 items-center">
                <div className="font-pretendard text-danger-10 text-base">
                  결제 상태 변경
                </div>
                <select
                  className="border-solid border-danger-10 border-[1px] rounded-xl px-2 py-4 cursor-pointer"
                  onChange={(e) => handleChange(e, ticket.id)}
                  value={ticketState[ticket.id] || '결제 대기'}
                >
                  <option value="결제 대기">결제 대기</option>
                  <option value="결제 완료">결제 완료</option>
                  <option value="예매 취소">예매 취소</option>
                </select>
                <button
                  className="px-3 py-2 bg-danger-10 cursor-pointer rounded-xl text-white"
                  onClick={() => handleSelectedState(ticket.id)}
                >
                  변경
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MobileTicketLists;
