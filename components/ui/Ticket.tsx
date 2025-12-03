interface TicketProps {
  ticket: string;
  price: string;
  state: string;
  onClick: () => void;
  className?: string;
}

const Ticket = ({ ticket, price, state, onClick, className }: TicketProps) => {
  const baseClass =
    'px-4 dt:px-5 mt-5 flex items-center justify-between w-[230px] dt:w-[352px] h-14 text-[16px] font-normal leading-6';

  if (state === 'selected') {
    return (
      <button
        onClick={onClick}
        className={`${className} ${baseClass} border border-primary-50 rounded-xl bg-gray-0 text-primary-50`}
      >
        <p className="w-[60px] text-start">{ticket}</p>
        <p className="w-[60px] text-left">{price}</p>
        <p className="ml-auto w-[65px] text-right">예매가능</p>
      </button>
    );
  }
  if (state === 'possible') {
    return (
      <button
        onClick={onClick}
        className={`${className} ${baseClass} text-gray-60 border border-gray-5`}
      >
        <p className="w-[60px]  text-start">{ticket}</p>
        <p className="w-[60px] text-left">{price}</p>
        <p className="ml-auto w-[65px] text-right">예매가능</p>
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      disabled
      className={`${className} ${baseClass} text-gray-30`}
    >
      <p className="w-[60px] text-start">{ticket}</p>
      <p className="w-[60px] text-left">{price}</p>
      <p className="ml-auto w-[65px] text-right">예매불가</p>
    </button>
  );
};

export default Ticket;
