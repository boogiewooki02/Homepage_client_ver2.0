import { useEffect, useRef, useState } from 'react';
import React from 'react';
import Image from 'next/image';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  address: string; // ✅ 부모에서 전달받은 주소
  mapLink: string; // ✅ 부모에서 전달받은 카카오맵 링크
}

declare global {
  interface Window {
    kakao: any;
  }
}

const apikey = process.env.NEXT_PUBLIC_KAKAOMAP_KEY;

const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  address,
  mapLink,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const handleOverlayClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const copyLocation = () => {
    navigator.clipboard.writeText(address).then(() => {
      alert('주소가 복사되었습니다!');
    });
  };

  useEffect(() => {
    if (!isOpen) return;
    if (!address) return;

    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apikey}&autoload=false`;
    script.async = true;

    const handleScriptLoad = () => {
      if (window.kakao && window.kakao.maps) {
        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, (result: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const lat = parseFloat(result[0].y);
            const lng = parseFloat(result[0].x);

            setLatitude(lat);
            setLongitude(lng);

            console.log(`📌 변환된 좌표: ${lat}, ${lng}`);

            const container = mapContainerRef.current;
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

            window.kakao.maps.event.addListener(marker, 'click', () => {
              window.open(mapLink, '_blank');
            });
          } else {
            console.error('📌 주소 검색 실패');
          }
        });
      }
    };

    script.onload = handleScriptLoad;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [isOpen, address, mapLink]);

  if (!isOpen) return null;

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed z-50 top-0 left-0 right-0 bottom-0 bg-[#0000008a] flex justify-center items-center"
    >
      <div className="fixed flex flex-col rounded-3xl w-[652px] h-[515px] z-50 bg-gray-0">
        <div className="w-full h-[76px] rounded-t-3xl bg-gray-80 text-gray-0 items-center flex px-8">
          <p className="text-[24px] font-semibold leading-9 w-[110px] whitespace-nowrap">
            공연장 위치
          </p>
          <Image
            src="/image/tabler_x.svg"
            width={24}
            height={24}
            alt="X"
            onClick={onClose}
            className="ml-auto cursor-pointer"
          />
        </div>
        <div className="px-8 py-6 flex flex-col">
          <div className="flex flex-row gap-3">
            <p className="text-[20px] font-medium leading-[30px] text-gray-90 text-start whitespace-nowrap truncate">
              {address}
            </p>
            <div
              onClick={copyLocation}
              className="flex flex-row items-center gap-1 cursor-pointer"
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
            ref={mapContainerRef}
            className="mt-4 w-[588px] h-[345px] rounded-xl flex-shrink-0"
          />
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
