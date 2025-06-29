import { useState, useEffect } from 'react';
import ButtonModal from '@/components/ui/ButtonModal';
import {
  cancelReservation,
  getReservationList,
} from '@/api/kahlua/reservation';
import { ReservationResponse } from '@/types/reservation';

// 동방 예약 내역 리스트
const ReservationList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reservations, setReservations] = useState<ReservationResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReservations = async () => {
    setIsLoading(true);
    const data = await getReservationList();
    if (data) {
      setReservations(data);
    }
    setIsLoading(false);
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
  const handleDeleteReservation = async (id: number) => {
    const success = await cancelReservation(id);
    if (success) {
      setReservations((prev) =>
        prev.filter((reservation) => reservation.reservationId !== id)
      );
    }
    handleCloseModal();
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div className="border-t-[1px] border-t-black">
      {isLoading ? null : (
        <div className="border-b-[1px] border-b-black">
          {reservations.length === 0 ? (
            <div className="py-12 text-center text-gray-500 text-base">
              예약 내역이 없습니다.
            </div>
          ) : (
            <ul>
              {reservations.map((reservation) => (
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
              ))}
            </ul>
          )}

          {/* 취소 모달 */}
          <ButtonModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            handleSubmit={() => {
              if (selectedReservation?.reservationId) {
                handleDeleteReservation(selectedReservation.reservationId);
              } else {
                console.error('선택된 예약이 없습니다.');
              }
            }}
            mainContent="예약을 취소하시겠습니까?"
            buttonContent="취소하기"
          />
        </div>
      )}
    </div>
  );
};

export default ReservationList;
