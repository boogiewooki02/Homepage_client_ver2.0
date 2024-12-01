import {
  Reservation,
  ReservationResponse,
} from '@/app/(kahlua)/reservation/page';
import React, { useState, useEffect } from 'react';

export const reservationStatuses = [
  { color: 'bg-gray-15', label: '예약 불가능' },
  { color: 'bg-primary-10', label: '예약 마감' },
  { color: 'bg-warning-10', label: '내예약' },
  { color: 'bg-gray-5', label: '예약 가능' },
];

interface TimeTableProps {
  reservation: Reservation;
  reservationsForDate: ReservationResponse[];
  onChange: (key: keyof Reservation, value: string) => void;
}

// todo: reservationsForDate 타임 테이블에 반영
const TimeTable = ({
  reservation,
  reservationsForDate,
  onChange,
}: TimeTableProps) => {
  const hours = Array.from({ length: 12 }, (_, i) => i + 10); // 10시부터 22시까지

  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

  const [countClick, setCountClick] = useState<number>(0);

  // 시간 선택 및 해제
  const handleTimeClick = (startTimeStr: string, endTimeStr: string) => {
    if (!reservation.reservationDate) {
      alert('날짜를 선택해 주세요!');
      return;
    }

    // 이미 시작과 종료 시간이 선택된 상태에서 다시 클릭하면 초기화
    if (countClick == 2) {
      setSelectedTimes([]);
      onChange('startTime', '');
      onChange('endTime', '');
      setCountClick(0); // 초기화
      return;
    }

    // 시작 시간이 없을 때: 시작 시간으로 설정
    if (!reservation.startTime) {
      onChange('startTime', startTimeStr);
      onChange('endTime', endTimeStr);
      setSelectedTimes([`${startTimeStr} ~ ${endTimeStr}`]);
      setCountClick(countClick + 1); // 1
    }
    // 시작 시간이 설정된 상태에서 두 번째 클릭: 종료 시간으로 설정
    else {
      onChange('endTime', endTimeStr);
      const newSelectedTimes = generateTimeRange(
        reservation.startTime,
        endTimeStr
      ); // 사이 시간 모두 선택
      setSelectedTimes(newSelectedTimes);
      setCountClick(countClick + 1); // 2
    }
  };

  // 시작 시간과 종료 시간 사이의 시간을 모두 선택
  const generateTimeRange = (start: string, end: string) => {
    const times = [];
    let current = start;

    while (current !== end) {
      const [hour, minute] = current.split(':').map(Number);
      const nextMinute = minute === 0 ? '30' : '00';
      const nextHour = minute === 0 ? hour : hour + 1;
      const nextTime = `${nextHour}:${nextMinute}`;

      times.push(`${current} ~ ${nextTime}`);
      current = nextTime;
    }

    times.push(`${current} ~ ${end}`);
    return times;
  };

  // 선택된 시간 범위 포맷
  const formatSelectedRange = () => {
    if (selectedTimes.length === 0) return '';

    const sortedTimes = selectedTimes
      .map((timeRange) => timeRange.split(' ~ '))
      .sort();

    const startTime = sortedTimes[0][0];
    const endTime = sortedTimes[sortedTimes.length - 1][1];

    return `${startTime} ~ ${endTime}`;
  };

  // 날짜 형식과 선택된 시간 범위 문자열 결합
  const formattedReservation = () => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    };
    const date = new Date(reservation.reservationDate);
    const dateString = date ? date.toLocaleDateString('ko-KR', options) : '';
    const timeRange = formatSelectedRange();

    return reservation.reservationDate ? `${dateString} ${timeRange}` : '';
  };

  // 타임 테이블 선택 및 해제 적용
  const getTimeSlotStatus = (startTime: string, endTime: string) => {
    const timeRange = `${startTime} ~ ${endTime}`;
    return selectedTimes.includes(timeRange) ? 'selected' : 'available';
  };

  return (
    <div className="flex flex-col w-full">
      <p className="text-black text-base mb-2">* 30분 단위 예약 가능</p>
      <div className="flex flex-row py-2 mb-6 overflow-x-scroll">
        {hours.map((hour) => (
          <div key={hour} className="flex flex-col dt:w-[100px] ph:w-[64px]">
            <span className="text-base mb-1">{hour}시</span>
            <div className="flex flex-row">
              <div
                key={`${hour}:00`}
                className={`pad:flex-1 h-[60px] w-[32px] cursor-pointer ${
                  reservation.reservationDate
                    ? getTimeSlotStatus(`${hour}:00`, `${hour}:30`) ===
                      'selected'
                      ? 'bg-primary-50 text-white'
                      : 'bg-gray-5'
                    : 'bg-gray-7 cursor-not-allowed'
                }`}
                onClick={() => handleTimeClick(`${hour}:00`, `${hour}:30`)}
              ></div>
              <div
                key={`${hour}:30`}
                className={`pad:flex-1 h-[60px] w-[32px] cursor-pointer mr-[1px] ${
                  reservation.reservationDate
                    ? getTimeSlotStatus(`${hour}:30`, `${hour + 1}:00`) ===
                      'selected'
                      ? 'bg-primary-50 text-white'
                      : 'bg-gray-5'
                    : 'bg-gray-7 cursor-not-allowed'
                }`}
                onClick={() => handleTimeClick(`${hour}:30`, `${hour + 1}:00`)}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap pad:flex-nowrap gap-6 pb-10 border-b border-gray-15 text-sm pad:text-base">
        {reservationStatuses.map((status, index) => (
          <div key={index} className="flex items-center">
            <span
              className={`inline-block w-4 h-4 pad:w-6 pad:h-6 ${status.color} mr-2`}
            ></span>
            {status.label}
          </div>
        ))}
      </div>
      {formattedReservation() && (
        <div className="mt-4 text-black pad:text-2xl pb-10 border-b border-gray-15">
          {formattedReservation()}
        </div>
      )}
    </div>
  );
};

export default TimeTable;
