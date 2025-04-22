const TableHeader = () => {
  const headers = [
    '기수',
    '이름',
    '세션',
    '로그인 정보',
    '승인 상태',
    '멤버 등급',
  ];

  const headerClasses = [
    'min-w-[100px] max-pad:min-w-[40px]',
    'min-w-[100px] max-pad:min-w-[60px]',
    'min-w-[160px] max-pad:min-w-[100px] max-[400px]:min-w-[60px]',
    'min-w-[140px] max-dt:min-w-[120px] max-pad:hidden',
    'min-w-[100px] max-dt:min-w-[120px] max-pad:min-w-[58px]',
    'min-w-[200px] pr-3 max-pad:pr-0 max-dt:min-w-[160px] max-pad:min-w-[90px]',
  ];

  return (
    <div className="w-full h-[74px] max-pad:h-[42px] bg-primary-20 rounded-t-[20px] border-b-0 border-2 border-[#808080] border-font-pretendard flex items-center px-4 max-dt:px-2 max-pad:px-2 shrink-0 max-dt:gap-0 justify-around">
      {headers.map((title, i) => (
        <div
          key={title}
          className={`${headerClasses[i]} text-center text-2xl max-dt:text-[22px] max-pad:text-sm font-semibold text-gray-0 break-words leading-tight`}
        >
          {title}
        </div>
      ))}
    </div>
  );
};

export default TableHeader;
