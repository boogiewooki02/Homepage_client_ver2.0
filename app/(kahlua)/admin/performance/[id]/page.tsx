'use client';

import { authInstance } from '@/api/auth/axios';
import CancelModal from '@/components/admin/CancelModal';
import EditModal from '@/components/admin/EditModal';
import InfoList from '@/components/templates/admin/Info';
import AdminButton from '@/components/ui/admin/Button';
import ImageBox from '@/components/ui/admin/ImageBox';
import TicketInfoList from '@/components/ui/admin/TicketInfo';
import Banner from '@/components/ui/Banner';
import WestIcon from '@mui/icons-material/West';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import {
  defaultData,
  defaultFreshmanTicketData,
  defaultGeneralTicketData,
  defaultImage,
  freshmanTiketInfoList,
  generalTiketInfoList,
  performanceImage,
  performanceInfoList,
} from '../../performanceInfo/performanceData';

const EditPerformancePage = () => {
  const params = useParams();
  const router = useRouter();

  const [data, setData] = useState<{ [key: string]: any }>(defaultData);
  const [freshmanTicketData, setFreshmanTicketData] = useState<{
    [key: string]: number;
  }>(defaultFreshmanTicketData);
  const [generalTicketData, setGeneralTicketData] = useState<{
    [key: string]: number;
  }>(defaultGeneralTicketData);
  const [image, setImage] = useState<{ [key: string]: string }>(defaultImage);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  // 공연 정보 가져오기
  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const response = await authInstance.get(`/performances/${params.id}`);
        if (response.data.isSuccess) {
          const performanceData = response.data.result.performanceResponse;

          setData({
            title: performanceData.title,
            content: performanceData.content,
            venue: performanceData.venue,
            address: performanceData.address,
            dateTime: performanceData.date_time,
            bookingStartDate: performanceData.booking_start_date,
            bookingEndDate: performanceData.booking_end_date,
            youtubeUrl: performanceData.youtube_url || '',
          });

          setImage({
            posterImageUrl: performanceData.poster_image_url,
          });

          setFreshmanTicketData({
            freshmanPrice: Number(performanceData.freshman_price),
            freshmanMaxPurchase: performanceData.freshman_max_purchase,
          });

          setGeneralTicketData({
            generalPrice: Number(performanceData.general_price),
            generalMaxPurchase: performanceData.general_max_purchase,
          });
        }
      } catch (error) {
        console.error('공연 정보 불러오기 실패:', error);
        alert('공연 정보를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchPerformance();
    }
  }, [params.id]);

  const onChangeData = useCallback((newValue: any, label: string) => {
    setData((prevData) => ({
      ...prevData,
      [label]: newValue,
    }));
  }, []);

  const onChangeImage = useCallback((newValue: string, label: string) => {
    setImage((prevData) => ({
      ...prevData,
      [label]: newValue,
    }));
  }, []);

  const onChangeFreshmanTicketData = useCallback(
    (newValue: number, label: string) => {
      setFreshmanTicketData((prevData) => ({
        ...prevData,
        [label]: newValue,
      }));
    },
    []
  );

  const onChangeGeneralTicketData = useCallback(
    (newValue: number, label: string) => {
      setGeneralTicketData((prevData) => ({
        ...prevData,
        [label]: newValue,
      }));
    },
    []
  );

  // 공연 정보 수정
  const onSaveEdit = useCallback(async () => {
    try {
      const performanceData = {
        posterImageUrl: image.posterImageUrl,
        youtubeUrl: data.youtubeUrl,
        title: data.title,
        content: data.content,
        venue: data.venue,
        address: data.address,
        dateTime: data.dateTime,
        freshmanPrice: String(freshmanTicketData.freshmanPrice),
        freshmanMaxPurchase: freshmanTicketData.freshmanMaxPurchase,
        generalPrice: String(generalTicketData.generalPrice),
        generalMaxPurchase: generalTicketData.generalMaxPurchase,
        bookingStartDate: data.bookingStartDate,
        bookingEndDate: data.bookingEndDate,
      };

      const response = await authInstance.put(
        `/admin/tickets/${params.id}`,
        performanceData
      );

      if (response.status === 200) {
        alert('공연 정보가 성공적으로 수정되었습니다.');
        setIsEditModalOpen(false);
        router.push(`/ticket/${params.id}`);
      }
    } catch (error: any) {
      console.error('공연 정보 수정 실패:', error);
      alert('공연 정보 수정에 실패했습니다.');
    }
  }, [data, image, freshmanTicketData, generalTicketData, params.id, router]);

  const onCancelEdit = useCallback(() => {
    router.push(`/ticket/${params.id}`);
  }, [router, params.id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <p className="text-gray-500 text-lg font-medium">로딩중...</p>
      </div>
    );
  }

  return (
    <div className="font-pretendard mx-auto w-full pad:w-[786px] dt:w-[1200px] h-auto flex flex-col gap-[40px]">
      <Banner>공연 정보 수정</Banner>

      <div className="flex flex-col pad:flex-row w-full max-pad:px-[16px] gap-[40px] justify-center items-center pad:items-start">
        <ImageBox
          data={image}
          field={performanceImage}
          onChange={onChangeImage}
        />
        <div className="flex flex-col w-full gap-[16px]">
          <InfoList
            data={data}
            fieldList={performanceInfoList}
            onChange={onChangeData}
          />
          <TicketInfoList
            data={freshmanTicketData}
            fieldList={freshmanTiketInfoList}
            onChange={onChangeFreshmanTicketData}
          >
            신입생
          </TicketInfoList>
          <TicketInfoList
            data={generalTicketData}
            fieldList={generalTiketInfoList}
            onChange={onChangeGeneralTicketData}
          >
            일반
          </TicketInfoList>
        </div>
      </div>

      <div className="flex flex-row gap-[24px] w-full max-pad:px-[16px] justify-end">
        <AdminButton onClick={onCancelEdit}>취소하기</AdminButton>
        <AdminButton
          onClick={() => setIsEditModalOpen(true)}
          className="bg-primary-50"
        >
          수정하기
        </AdminButton>
        <EditModal
          isOpen={isEditModalOpen}
          setIsOpen={setIsEditModalOpen}
          handleSubmit={onSaveEdit}
        />
      </div>

      <div className="flex w-auto h-auto max-pad:mx-[16px]">
        <div
          className="flex flex-row gap-[8px] items-center cursor-pointer"
          onClick={() => setIsCancelModalOpen(true)}
        >
          <WestIcon />
          <span className="text-[16px] font-medium">Admin 홈으로</span>
        </div>
      </div>
      <CancelModal
        isOpen={isCancelModalOpen}
        setIsOpen={setIsCancelModalOpen}
      />
    </div>
  );
};

export default EditPerformancePage;
