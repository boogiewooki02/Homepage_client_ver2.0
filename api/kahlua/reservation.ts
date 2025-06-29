import { authInstance } from '@/api/auth/axios';
import { ReservationResponse } from '@/types/reservation';

/* 예약 목록 조회 */
export const getReservationList = async (): Promise<
  ReservationResponse[] | null
> => {
  try {
    const res = await authInstance.get('/my-page/reservation');
    return res.data.result.reservationResponseList;
  } catch (err) {
    console.error('예약 목록 조회 실패:', err);
    return null;
  }
};

/* 예약 취소 */
export const cancelReservation = async (
  reservationId: number
): Promise<boolean> => {
  try {
    await authInstance.delete(`/my-page/reservation/${reservationId}`);
    return true;
  } catch (err) {
    console.error('예약 취소 실패:', err);
    return false;
  }
};
