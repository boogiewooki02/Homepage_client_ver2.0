import { useState, useEffect } from 'react';
import { authInstance } from '@/api/auth/axios';
import ButtonModal from '@/components/ui/ButtonModal';

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

// 동방 예약 내역 리스트
const ReservationList = () => {
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

  // 예약 취소 함수
  const deleteReservation = async (id: number) => {
    try {
      const response = await authInstance.delete(`/my-page/reservation/${id}`);
      setReservations(
        reservations.filter((reservation) => reservation.reservationId !== id)
      );
    } catch (error) {
      console.error('예약 취소 실패:', error);
    } finally {
      handleCloseModal();
    }
  };

  useEffect(() => {
    getReservationList();
  }, []);

  return (
    <div>
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
                onClick={() => {
                  handleCancleReservation(reservation.reservationId);
                }}
              >
                예약 취소하기
              </p>
            </li>
          );
        })}
      </ul>
      {/* 취소 모달 */}
      <ButtonModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        handleSubmit={() => {
          // 에러 처리
          if (selectedReservation?.reservationId) {
            deleteReservation(selectedReservation.reservationId);
          } else {
            console.error('선택된 예약이 없습니다.');
          }
        }}
        mainContent="예약을 취소하시겠습니까?"
        buttonContent="취소하기"
      />
    </div>
  );
};

export default ReservationList;
