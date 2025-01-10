'use client';
import Banner from '@/components/reservation/Banner';
import CalendarUI from '@/components/reservation/CalendarUI';
import ReservationForm from '@/components/reservation/ReservationForm';
import RoomNotice from '@/components/reservation/RoomNotice';
import TimeTable from '@/components/reservation/TimeTable';
import React, { useEffect, useState } from 'react';
import { authInstance } from '@/api/auth/axios';
import SockJS from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';

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

  const router = useRouter();

  const [stompClient, setStompClient] = useState<StompJs.Client | null>(null);

  // WebSocket 연결 및 STOMP 클라이언트 초기화
  useEffect(() => {
    const accessToken = Cookie.get('access_token');
    // 1. 클라이언트 생성
    const client = new StompJs.Client({
      webSocketFactory: () => new SockJS('https://api.kahluaband.com/ws'),
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      debug: (str) => {
        console.log('stomp debug: ', str);
      },
      reconnectDelay: 5000,
    });

    // 3. 연결 성공 시 구독
    client.onConnect = (frame) => {
      console.log('Connected to WebSocket: ', frame);

      if (reservation.reservationDate) {
        client.subscribe(
          `/topic/public/${reservation.reservationDate}`,
          (message) => {
            console.log('메시지: ', JSON.parse(message.body));
          }
        );
      }
    };

    client.onStompError = (frame) => {
      console.log('STOMP 오류: ', frame);
      // 액세스 토큰 만료시 로그인 화면으로 이동 (todo: 토큰 재발급 필요)
      if (
        frame.headers.message ===
        'Failed to send message to ExecutorSubscribableChannel[clientInboundChannel]'
      ) {
        router.push('/login');
      }
    };

    // 2. 클라이언트 활성화
    client.activate();
    setStompClient(client);

    // 6. WebSocket 연결 해제
    return () => {
      if (client.active) {
        client.deactivate();
        console.log('Disconnected from WebSocket');
      }
    };
  }, [reservation.reservationDate]); // reservationDate가 변경될 때마다 연결

  const handleChange = (key: keyof Reservation, value: string) => {
    setReservation((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // 날짜별 예약 내역 조회 (http 요청)
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

  // 컴포넌트 전환 (4. 발행1)
  const handleNext = () => {
    window.scrollTo(0, 0);

    if (stompClient && stompClient.connected) {
      // STOMP 메시지 전송(publish)
      const destination = `/app/reserve.proceed/${reservation.reservationDate}`;
      const body = JSON.stringify({
        startTime: reservation.startTime,
        endTime: reservation.endTime,
      });

      stompClient.publish({
        destination: destination,
        body: body,
      });
    } else {
      console.error('STOMP Client is not connected.');
    }

    setIsFormVisible(false);
  };

  // 예약 확정 (5. 발행2)
  const handleReservationSubmit = async (reservation: Reservation) => {
    console.log('예약 정보:', reservation);

    if (stompClient && stompClient.connected) {
      const destination = `/app/reserve.complete/${reservation.reservationDate}`;
      const body = JSON.stringify({
        type: reservation.type,
        clubroomUsername: reservation.clubroomUsername,
        startTime: `${reservation.startTime}:00`,
        endTime: `${reservation.endTime}:00`,
      });

      stompClient.publish({
        destination: destination,
        body: body,
      });

      console.log('Reservation completion request sent via STOMP:', {
        destination,
        body,
      });
    } else {
      console.error('STOMP Client is not connected.');
    }
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
