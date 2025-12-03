const ReservationNotice = () => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-[18px] pad:text-xl font-semibold">
        예약 전 유의사항
      </h2>
      <ul className="text-sm pad:text-base list-disc pl-5 text-gray-40">
        <li>
          홈페이지 예약 정보 업데이트가 늦어지거나, 동시접속자가 많아지는 경우
          예약 중복이 발생할 수 있습니다.
          <br />
          최대한 빠르게 연락처로 연락드린 후 조율해드릴 예정이니 양해
          부탁드립니다.
        </li>
        <li>
          예약 일정은 [동방예약] 페이지 또는 [마이페이지 -&gt; 나의 예약
          확인하기]에서 확인하실 수 있습니다.
        </li>
        <li>
          예약일정 변경을 위해서는 [예약취소] 후 변경된 일정으로 다시 예약하셔야
          합니다.
        </li>
        <li>예약취소는 [마이페이지]에서 취소하실 수 있습니다.</li>
      </ul>
    </div>
  );
};

export default ReservationNotice;
