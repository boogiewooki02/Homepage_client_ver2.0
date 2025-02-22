import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LocationModal from '@/components/popups/ticket/LocaltionModal';
import TicketOption from '@/components/templates/ticket/TicketOption';
import Bar from '@/components/ui/Bar';
import DropdownMenu from '@/components/templates/ticket/DropdownMenu';
import RecommendedList from '@/components/ticket/RecommendedList';
import { axiosInstance } from '@/api/auth/axios';
import defaultPoster from '@/public/image/ticket/DefaultPoster.svg';
import dayjs from 'dayjs';

const apikey = process.env.NEXT_PUBLIC_KAKAOMAP_KEY;

declare global {
  interface Window {
    kakao: any;
  }
}

interface TicketDetailProps {
  id: string;
}

const TicketDetail = ({ id }: TicketDetailProps) => {
  const [isDays, setIsDays] = useState(false);
  const [ticketInfo, setTicketInfo] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const [nowUrl, setNowUrl] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [placeId, setPlaceId] = useState<string | null>(null);
  const [loc, setLoc] = useState('');
  const [statusText, setStatusText] = useState<string>('예매 마감');
  const [isLoading, setIsLoading] = useState(true);

  const getTicketDetail = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`/performances/${id}`);
      if (response.data.isSuccess) {
        const rawData = response.data.result.ticketInfoResponse;
        const bookingStart = dayjs(rawData.booking_start_date);
        const bookingEnd = dayjs(rawData.booking_end_date);
        const now = dayjs();
        const daysBeforeStart = bookingStart.diff(now, 'day');

        let isAvailable = false;
        let status = '예매 마감';

        if (now.isBefore(bookingStart)) {
          status = `오픈 D-${daysBeforeStart}`;
        } else if (now.isAfter(bookingStart) && now.isBefore(bookingEnd)) {
          isAvailable = true;
          status = '예매 가능';
        }

        setLoc(rawData?.address);
        setTicketInfo({
          ...rawData,
          dateForMinute: dayjs(rawData.date_time).format('YYYY-MM-DD HH:mm'),
          dateOption: dayjs(rawData.date_time).format(
            'YYYY년 MM월 DD일 HH시 mm분'
          ),
          freshmanPrice: rawData.freshman_price
            ? `${rawData.freshman_price}원`
            : '무료',
          generalPrice: rawData.general_price
            ? `${rawData.general_price}원`
            : '5,000원',
        });
        setIsDays(isAvailable);
        setStatusText(status);
      }
    } catch (error) {
      console.error('티켓 상세 정보 불러오는 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsClient(true);
    setNowUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (id) {
      getTicketDetail(id);
    }
  }, [id]);

  useEffect(() => {
    if (loc) {
      loadKakaoMap(loc);
    }
  }, [loc]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 600;
      const newOpacity = Math.max(1 - scrollPosition / threshold, 0);
      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDays]);

  useEffect(() => {
    if (!loc) return;

    if (!window.kakao) {
      const script = document.createElement('script');
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apikey}&libraries=services&autoload=false`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(() => {
            loadKakaoMap(loc);
          });
        }
      };
    } else if (window.kakao && window.kakao.maps) {
      loadKakaoMap(loc);
    }
  }, [loc]);

  const loadKakaoMap = async (address: string) => {
    if (window.kakao && window.kakao.maps) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const lat = parseFloat(result[0].y);
          const lng = parseFloat(result[0].x);

          setLatitude(lat);
          setLongitude(lng);
          createMap(lat, lng);
          setPlaceId(result[0].place_url);
        }
      });
    }
  };

  /* 지도 & 마커 생성 */
  const createMap = (lat: number, lng: number) => {
    const container = document.getElementById('map');
    if (!container) return;

    const options = {
      center: new window.kakao.maps.LatLng(lat, lng),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);

    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(lat, lng),
      map: map,
      draggable: true,
    });

    window.kakao.maps.event.addListener(marker, 'click', function () {
      if (placeId) {
        window.open(placeId, '_blank');
      }
    });
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(nowUrl).then(() => {
      alert('링크가 복사되었습니다!');
    });
  };

  const copyLocation = () => {
    navigator.clipboard.writeText(loc).then(() => {
      alert('주소가 복사되었습니다!');
    });
  };

  const formatDateTime = (isoString: string): string => {
    if (!isoString) return '';
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();

    return `${year}년 ${month}월 ${day}일 ${hours}시`;
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 834) {
        closeModal();
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading || !ticketInfo) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <p className="text-gray-500 text-lg font-medium" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col pad:flex-row pad:mt-8 pad:h-[328px] w-full pad:w-full dt:h-[376px] dt:justify-center mx-auto">
        <Image
          src={ticketInfo?.poster_image_url || defaultPoster}
          alt="포스터사진"
          width={833}
          height={376}
          className={`z-[-1] sticky top-0 w-full h-auto mb:w-[300px] pad:w-[246px] pad:h-[328px] dt:w-[282px] dt:h-[376px] mb:rounded-xl mx-auto pad:mx-0 transition-opacity duration-300 ${opacity < 1 ? 'opacity-100' : 'opacity-0'}`}
          style={
            isClient && window.innerWidth <= 500
              ? { opacity: opacity, transition: 'opacity 0.3s ease-out' }
              : { opacity: 1 }
          }
        />
        <div className="z-10 bg-gray-0 flex flex-col w-full h-[355px] mb:w-[350px] pad:w-full dt:w-[338px] px-4 pt-6 pad:pt-0 pad:mt-2 pad:ml-8 mx-auto dt:mr-0 pad:px-0">
          <div
            className={`inline-flex rounded-[32px] gap-2.5 items-center justify-center py-1 px-3  text-[16px] max-w-max
          ${isDays ? 'bg-primary-50 text-gray-0' : 'bg-gray-10 text-gray-50'}`}
          >
            {statusText}
          </div>
          <div className="mt-5 pad:mt-4 gap-1 pad:gap-4 flex flex-row">
            <p className="min-w-[190px] pad:w-[217px] pad:max-w-[217px] h-9 text-gray-90 font-semibold leading-9 text-[20px] pad:text-[24px] whitespace-nowrap">
              {ticketInfo?.title}
            </p>
            <div onClick={copyUrl} className="flex flex-col justify-center">
              <Image
                src="/image/ticket/share.svg"
                alt="share"
                width={24}
                height={24}
                className="cursor-pointer h-5 w-5 pad:h-6 pad:w-6"
              />
            </div>
          </div>
          <div className="flex flex-row mt-4 pad:mt-6 text-[16px] pad:text-[18px] leading-9 font-normal gap-6 h-7">
            <p className="text-gray-40 w-7 pad:w-8">장소</p>
            <p className="text-gray-90">{ticketInfo?.venue}</p>
          </div>
          <div className="flex flex-row mt-4 pad:mt-6 text-[16px] pad:text-[18px] leading-9 font-normal gap-6 h-7">
            <p className="text-gray-40 w-7 pad:w-8">일시</p>
            <p className="text-gray-90 ">
              {formatDateTime(ticketInfo?.date_time) || ''}
            </p>
          </div>
          <div className="flex flex-row mt-4 pad:mt-6 text-[16px] pad:text-[18px] leading-9 font-normal">
            <p className="text-gray-40 w-7 pad:w-8 h-7">가격</p>
            <div className="ml-6 flex flex-col">
              {/*
              <div className="flex flex-row items-start h-7">
                <p className="text-gray-90 w-[74px] pad:w-[83px] ">
                  신입생 티켓
                </p>
                <p className="text-primary-50 w-7 pad:w-8 ml-6 font-semibold">
                  {information.tickets.freshman.price}
                </p>
                <p className="text-gray-40 text-[14px] font-normal ml-2 flex justify-center w-[68px]">
                  1인 최대 {information.tickets.freshman.maxQuantity}매
                </p>
              </div>
              <div className="flex flex-row items-start h-7 mt-2 pad:mt-5">
              */}
              <div className="flex flex-row items-start h-7 mb-9 pad:mb-12">
                <p className="text-gray-90 w-[60px] pad:w-[67px]">일반 티켓</p>
                <p className="text-primary-50 w-[58px] pad:w-[66px] ml-10 font-semibold">
                  {ticketInfo?.general_price
                    ? Number(ticketInfo.general_price).toLocaleString() + '원'
                    : '무료'}
                </p>

                <p className="text-gray-40 text-[14px] font-normal ml-2 flex justify-center">
                  1인 최대 {ticketInfo?.general_max_purchase}매
                </p>
              </div>
            </div>
          </div>
          <Link
            href={
              isDays ? '/ticket/search/' : `${ticketInfo?.youtube_url ?? '#'}`
            }
            onClick={(e) => {
              if (
                !isDays &&
                !ticketInfo?.youtube_url &&
                !dayjs().isBefore(dayjs(ticketInfo?.date_time))
              ) {
                e.preventDefault();
                alert('공연 영상이 존재하지 않습니다.');
              }
            }}
            className={`max-pad:mx-auto mt-[21px] w-full dt:w-[316px] h-[52px] dt:h-[60px] flex pad:hidden dt:flex flex-shrink-0 text-center items-center justify-center rounded-xl text-[18px] font-medium   ${
              !isDays && dayjs().isBefore(dayjs(ticketInfo?.date_time))
                ? 'bg-gray-5 text-gray-60 cursor-not-allowed'
                : 'bg-gray-5 ph:bg-primary-50 text-gray-60 ph:text-gray-0'
            }`}
          >
            {isDays ? '예매 조회/취소' : '공연영상 보러가기'}
          </Link>
        </div>
        <div className="z-20 bg-gray-0 h-[40px] w-[100vw] flex pad:hidden items-center" />
        <div className="flex z-10 flex-shrink-0 pad:hidden w-full mb:w-[328px] pad:w-full h-2 bg-gray-5 mx-auto" />
        <div className="z-20 bg-gray-0 h-[24px] w-[100vw] flex pad:hidden items-center" />
        <div className="hidden ph:flex z-10 bg-gray-0 pad:hidden dt:flex flex-col w-[100%] px-4 mb:px-0 mb:w-[328px] pad:ml-[164px] h-[282px] pad:mt-[78px] pad:h-full mx-auto">
          <p className="text-[16px] pad:text-[18px] font-medium left-9 text-primary-60 pad:text-primary-50 h-[27px]">
            공연장 위치
          </p>
          <div className="flex flex-row gap-3 mt-1">
            <p className="text-[16px] pad:text-[20px] font-medium leading-[30px] text-gray-90 text-left w-[194px] pad:w-[294px] whitespace-nowrap truncate">
              {loc}
            </p>
            <div
              onClick={copyLocation}
              className="flex flex-row cursor-pointer items-center gap-1"
            >
              <Image
                src="/image/ticket/copy.svg"
                width={20}
                height={20}
                alt="copy"
              />
              <p className="text-gray-40 font-medium text-[16px] leading-6">
                복사
              </p>
            </div>
          </div>
          <div
            id="map"
            className="top-[11px] w-full h-[calc(100vw*192/328)] max-h-[192px] pad:max-h-[225px] mb:w-[328px] pad:w-[376px] mb:h-[192px] pad:h-[225px] rounded-xl flex-shrink-0 z-0"
          />
          <div className="min-h-[164px]" />
        </div>
      </div>
      <div className="w-full h-[98px] bg-gray-0 bottom-0 z-40 left-0">
        <DropdownMenu isDays={isDays} data={ticketInfo} />
        <div className="w-[100%] hidden pad:flex flex-row gap-[18px] mt-4 ">
          <button
            onClick={openModal}
            className="w-[376px] h-[60px] flex dt:hidden flex-shrink-0 text-center items-center justify-center text-gray-0 bg-gray-90 rounded-xl text-[18px] font-medium underline"
          >
            공연장 위치 ↗
          </button>
          <Link
            href={
              isDays ? '/ticket/search/' : `${ticketInfo?.youtube_url ?? '#'}`
            }
            onClick={(e) => {
              if (
                !isDays &&
                !ticketInfo?.youtube_url &&
                !dayjs().isBefore(dayjs(ticketInfo?.date_time))
              ) {
                e.preventDefault();
                alert('공연 영상이 존재하지 않습니다.');
              }
            }}
            className={`w-[376px] h-[60px] flex dt:hidden flex-shrink-0 text-center items-center justify-center rounded-xl text-[18px] font-medium ${
              !isDays && dayjs().isBefore(dayjs(ticketInfo?.date_time))
                ? 'bg-gray-5 text-gray-60 cursor-not-allowed'
                : ' bg-primary-50 text-gray-0'
            }`}
          >
            {isDays ? '예매 조회/취소' : '공연영상 보러가기'}
          </Link>
        </div>
        <Bar className="mt-10 hidden pad:flex w-[768px] dt:w-[1200px]" />
        {isDays ? (
          <TicketOption data={ticketInfo} isDays={isDays} />
        ) : (
          <RecommendedList id={ticketInfo?.id} />
        )}
        <LocationModal
          isOpen={isModalOpen}
          onClose={closeModal}
          address={loc}
          mapLink={`https://map.kakao.com/link/search/${encodeURIComponent(loc)}`}
        />
      </div>
    </>
  );
};

export default TicketDetail;
