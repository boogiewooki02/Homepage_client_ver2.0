import { useState, useEffect } from 'react';
import ButtonModal from '../ui/ButtonModal';
import { authInstance } from '@/api/auth/axios';

interface ReservationProps {
  reservationId: number;
  email: string;
  type: string;
  clubroomUsername: string;
  reservationDate: string;
  startTime: string;
  endTime: string;
  status: string;
}

export const ReservationList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reservations, setReservations] = useState<ReservationProps[]>([]);

  const getReservationList = async () => {
    try {
      const response = await authInstance.get('/my-page/reservation');
      setReservations(response.data.result.reservationResponseList);
    } catch (error) {
      console.error(error);
    }
  };

  // 개별 취소를 위한 선택한 예약 정보 state
  const [selectedReservation, setSelectedReservation] = useState<{
    reservationId: number;
  } | null>(null);

  const handleCancleReservation = (reservationId: number) => {
    setSelectedReservation({ reservationId });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReservation(null); // 선택된 예약 초기화
  };

  const handleSubmitCancellation = () => {
    console.log(`예약 취소: ${selectedReservation?.reservationId}`);

    const deleteReservation = async (id: number) => {
      try {
        const response = await authInstance.delete(
          `/my-page/reservation/${id}`
        );
        setReservations(
          reservations.filter((reservation) => reservation.reservationId !== id)
        );

        console.log(`예약 ID ${id} 삭제 성공`);
      } catch (error) {
        console.error('예약 취소 실패:', error);
      }
    };

    // 예약 취소 로직 작성 필요
    handleCloseModal();
  };

  useEffect(() => {
    getReservationList();
  }, []);

  return (
    <div>
      {reservations.length > 0 ? (
        <ul>
          {reservations.map((reservation) => {
            return (
              <li
                key={reservation.reservationId}
                className="flex flex-col pad:flex-row py-6 pad:items-center ph:items-start gap-4 self-stretch relative border-y-[1px] border-y-solid border-y-gray-10"
              >
                <div className="flex gap-4">
                  <p className="text-black text-xl font-semibold">
                    {reservation.reservationDate}
                  </p>
                  <p className="text-black text-xl font-semibold">
                    {reservation.startTime} - {reservation.endTime}
                  </p>
                </div>
                <div className="flex py-1 px-2 justify-center items-center gap-[10px] rounded-full border-[1px] border-solid border-primary-50">
                  <p className="flex items-center text-primary-50 text-base font-normal">
                    {reservation.type === 'TEAM'
                      ? `팀 : ${reservation.clubroomUsername}`
                      : `${reservation.clubroomUsername}`}
                  </p>
                </div>
                <p
                  className="flex items-center text-danger-40 text-base font-normal absolute right-0 bottom-6 pad:top-6 cursor-pointer"
                  onClick={() =>
                    handleCancleReservation(reservation.reservationId)
                  }
                >
                  예약 취소하기
                </p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="flex text-gray-40 text-[16px] pad:text-[20px] leading-6 flex-col py-6">
          예약 내역이 없습니다.
        </p>
      )}
      {/* 취소 모달 */}
      <ButtonModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        handleSubmit={handleSubmitCancellation}
        mainContent="예약을 취소하시겠습니까?"
        buttonContent="취소하기"
      />
    </div>
  );
};
