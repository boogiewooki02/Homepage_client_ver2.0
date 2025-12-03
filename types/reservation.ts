// 예약 요청 정보 타입
export type ReservationRequest = {
  type: string; // ex) TEAM
  clubroomUsername: string;
  reservationDate: string; // '2024-01-01'
  startTime: string; // '11:00:00'
  endTime: string; // '12:00:00'
};

// 예약 정보 응답 타입
export interface ReservationResponse {
  reservationId: number;
  email: string;
  type: string;
  clubroomUsername: string;
  reservationDate: string;
  startTime: string;
  endTime: string;
  status: string;
}
