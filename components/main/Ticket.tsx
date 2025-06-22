import { TicketIntroPad, TicketIntroPhone } from './TicketIntro';

const Ticket = () => {
  return (
    <div className="flex flex-col w-full max-pad:max-w-[500px] max-pad:px-[16px] pad:w-[786px] dt:w-[1200px] h-auto items-center mt-[48px] mb-[80px] pad:mt-[120px] pad:mb-[240px] ">
      <div className="flex justify-start w-full font-mustica text-[24px] pad:text-[48px] font-semibold">
        TICKET
      </div>

      {/* ticket Introduction */}
      <TicketIntroPad className="max-pad:hidden" />
      <TicketIntroPhone className="pad:hidden" />
    </div>
  );
};
export default Ticket;
