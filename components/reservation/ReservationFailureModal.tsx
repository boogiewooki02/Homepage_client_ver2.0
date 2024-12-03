const ReservationFailureModal = () => {
  return (
    <div className="flex flex-col text-center gap-6">
      <div className="text-xl pad:text-2xl font-semibold">예약 실패</div>
      <div className="text-base pad:text-lg font-medium">
        이미 예약이 완료된 시간대입니다.
        <br />
        다른 시간을 선택하여 예약을 진행해주세요.
      </div>
    </div>
  );
};

export default ReservationFailureModal;
