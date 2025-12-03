import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ThemeProvider, createTheme } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

const theme = createTheme({
  components: {
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '20px 36px',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Pretendard',
        },
      },
    },
  },
});

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

interface TicketMemberProps {
  id: number;
  name: string;
  phone_num: string;
}

const TicketLists = ({
  ticketData,
  ticketState,
  handleSelectedState,
  handleChange,
}: {
  type: string;
  ticketData: TicketProps[];
  ticketState: Record<number, string>;
  handleSelectedState: (ticketId: number) => void;
  handleChange: (
    e: React.ChangeEvent<HTMLSelectElement>,
    ticketId: number
  ) => void;
}) => {
  const copyReservationId = (reservation_id: string) => {
    navigator.clipboard.writeText(reservation_id).then(() => {
      alert('예매번호가 복사되었습니다!');
    });
  };

  const copyPhoneNum = (phone_num: string) => {
    navigator.clipboard.writeText(phone_num).then(() => {
      alert('전화번호가 복사되었습니다!');
    });
  };

  return (
    <ThemeProvider theme={theme}>
      {ticketData.map((ticket) => (
        <Accordion key={ticket.id}>
          <div className="flex">
            <AccordionSummary
              className="dt:w-[1200px] pad:w-[786px] max-pad:max-w-[500px] max-pad:px-4 border-solid border-gray-10 border-b-2 px-5 flex-1"
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div className="w-full flex items-center justify-between flex-wrap">
                {ticket.status === 'FINISH_PAYMENT' ? (
                  <Typography
                    component="div"
                    className="min-w-[100px] text-center text-base font-medium text-primary-50"
                  >
                    결제 완료
                  </Typography>
                ) : ticket.status === 'WAIT' ? (
                  <Typography
                    component="div"
                    className="min-w-[100px] text-center text-base font-medium text-gray-30"
                  >
                    결제 대기
                  </Typography>
                ) : ticket.status === 'CANCEL_REQUEST' ? (
                  <Typography
                    component="div"
                    className="min-w-[100px] text-center text-base font-medium text-danger-40"
                  >
                    취소 요청
                  </Typography>
                ) : ticket.status === 'CANCEL_COMPLETE' ? (
                  <Typography
                    component="div"
                    className="min-w-[100px] text-center text-base font-medium text-gray-30"
                  >
                    예매 취소
                  </Typography>
                ) : null}
                <div className="flex">
                  <Typography
                    component="div"
                    className="min-w-[160px] text-center text-base font-medium text-gray-60"
                  >
                    {ticket.reservation_id}
                  </Typography>
                  <div
                    onClick={() => copyReservationId(ticket.reservation_id)}
                    className="flex items-center justify-start cursor-pointer"
                  >
                    <Image
                      src="/image/ticket/copy.svg"
                      width={20}
                      height={20}
                      alt="copy"
                      className="w-4 h-4 pad:w-5 pad:h-5"
                    />
                  </div>
                </div>
                <Typography
                  component="div"
                  className="min-w-[100px] text-center text-base font-medium text-gray-60"
                >
                  {ticket.buyer}
                </Typography>
                <div className="flex">
                  <Typography
                    component="div"
                    className="min-w-[140px] text-center text-base font-medium text-gray-60"
                  >
                    {ticket.phone_num}
                  </Typography>
                  <div
                    onClick={() => copyPhoneNum(ticket.phone_num)}
                    className="flex items-center justify-start cursor-pointer"
                  >
                    <Image
                      src="/image/ticket/copy.svg"
                      width={20}
                      height={20}
                      alt="copy"
                      className="w-4 h-4 pad:w-5 pad:h-5"
                    />
                  </div>
                </div>
                <Typography
                  component="div"
                  className="min-w-[100px] text-center text-base font-medium text-gray-60"
                >
                  {ticket.total_ticket}장
                </Typography>
              </div>
            </AccordionSummary>
          </div>
          <AccordionDetails>
            <Typography component="div">
              {ticket.members &&
                ticket.members.map((member) => (
                  <div key={member.id} className="flex items-center pb-3 gap-4">
                    <div className="font-pretendard text-gray-20 text-base">
                      동반인
                    </div>
                    <div className="flex items-center px-4 py-2 gap-4 rounded-xl bg-gray-5">
                      <div className="text-base font-medium text-gray-60">
                        이름 : {member.name}
                      </div>
                      <div className="text-base font-medium text-gray-60">
                        전화번호 : {member.phone_num}
                      </div>
                      <div
                        onClick={() => copyPhoneNum(member.phone_num)}
                        className="flex items-center justify-start cursor-pointer"
                      >
                        <Image
                          src="/image/ticket/copy.svg"
                          width={20}
                          height={20}
                          alt="copy"
                          className="w-4 h-4 pad:w-5 pad:h-5"
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </Typography>
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
          </AccordionDetails>
        </Accordion>
      ))}
    </ThemeProvider>
  );
};

export default TicketLists;
