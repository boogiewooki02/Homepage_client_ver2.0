'use client';
import Banner from '@/components/reservation/Banner';
import CalendarUI from '@/components/reservation/CalendarUI';
import ReservationForm from '@/components/reservation/ReservationForm';
import RoomNotice from '@/components/reservation/RoomNotice';
import TimeTable from '@/components/reservation/TimeTable';
import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import { authInstance } from '@/api/auth/axios';

// 예약 요청 정보 타입
export type Reservation = {
  type: string; // ex) TEAM
  clubroomUsername: string;
  reservationDate: string; // '2024-01-01'
  startTime: string; // '11:00:00'
  endTime: string; //'12:00:00'
};

// 예약 정보 응답 타입
export type ReservationResponse = {
  reservationId: number;
  email: string;
  type: string;
  clubroomUsername: string;
  reservationDate: string;
  startTime: string;
  endTime: string;
  status: string; // ex) RESERVED
};

const page = () => {
  // 예약 폼 표시 여부
  const [isFormVisible, setIsFormVisible] = useState(true);

  const [reservation, setReservation] = useState<Reservation>({
    type: '',
    clubroomUsername: '',
    reservationDate: '',
    startTime: '',
    endTime: '',
  });
  const [reservationsForDate, setReservationsForDate] = useState<
    ReservationResponse[]
  >([]);

  // 웹소켓 연결을 위한 accessToken 추출
  const accessToken =
    document.cookie
      .split(';')
      .find((c) => c.trim().startsWith('access_token='))
      ?.split('=')[1] || '';

  // const [stompClient, setStompClient] = useState<Client | null>(null);

  // const client = new Client({
  //   brokerURL: 'wss://api.kahluaband.com/v1/ws',
  //   connectHeaders: {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  //   debug: (str) => {
  //     console.log('websocket debug: ', str);
  //   },
  //   onConnect: () => {
  //     console.log('websocket connected');
  //   },
  //   onDisconnect: () => {
  //     console.log('websocket disconnected');
  //   },
  // });

  // client.activate();

  const handleChange = (key: keyof Reservation, value: string) => {
    setReservation((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const fetchReservationsForDate = async (date: string) => {
    try {
      const response = await authInstance.get(`/reservation?date=${date}`);
      if (response.data.isSuccess) {
        const reservationData =
          response.data.result.reservationResponseList || [];
        setReservationsForDate(reservationData);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log('Error fetching reservations:', error);
    }
  };

  // 다음 버튼 클릭시 컴포넌트 전환
  const handleNext = () => {
    window.scrollTo(0, 0);
    setIsFormVisible(false);
  };

  // 예약 정보 서버로 전송 함수 (todo: 추가수정필요)
  const handleReservationSubmit = async (reservation: Reservation) => {
    console.log('예약 정보:', reservation);
    // 서버로 reservationData 전송하는 로직 추가 필요
  };

  const renderFormView = () => (
    <div className="mx-4 pad:m-0 flex flex-col items-center gap-y-6">
      <CalendarUI
        onChange={(key, value) => {
          handleChange(key, value);
          if (key === 'reservationDate') {
            fetchReservationsForDate(value);
          }
        }}
      />
      <TimeTable
        reservation={reservation}
        reservationsForDate={reservationsForDate}
        onChange={handleChange}
      />
      <RoomNotice />
      <button
        onClick={handleNext}
        disabled={!reservation.startTime}
        className={`rounded-xl w-[280px] h-[60px] text-[#fff] text-lg
          ${reservation.reservationDate && reservation.startTime ? 'bg-primary-50 hover:bg-primary-60' : 'bg-gray-10'}`}
      >
        다음
      </button>
    </div>
  );

  const renderReservationForm = () => (
    <div className="mx-4 pad:m-0">
      <ReservationForm
        reservation={reservation}
        onChange={handleChange}
        onSubmit={handleReservationSubmit}
      />
    </div>
  );

  return (
    <div className="font-pretendard pb-48 mx-auto w-full pad:w-[786px] dt:w-[1200px] flex flex-col justify-center">
      <Banner />
      {isFormVisible ? renderFormView() : renderReservationForm()}
    </div>
  );
};

export default page;
