'use client';

import * as React from 'react';
import { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import WestIcon from '@mui/icons-material/West';
import Banner from '@/components/ui/Banner';
import InfoList from '@/components/templates/admin/Info';
import {
  defaultData,
  defaultImage,
  performanceInfoList,
  performanceImage,
  defaultFreshmanTicketData,
  defaultGeneralTicketData,
  freshmanTiketInfoList,
  generalTiketInfoList,
} from './performanceData';
import AdminButton from '@/components/ui/admin/Button';
import EditModal from '@/components/admin/EditModal';
import CancelModal from '@/components/admin/CancelModal';
import ImageBox from '@/components/ui/admin/ImageBox';
import { isChanged } from '@/components/util/isChanged';
import TicketInfoList from '@/components/ui/admin/TicketInfo';

const PerformancePage = () => {
  const [data, setData] = useState<{ [key: string]: any }>(defaultData);
  const [freshmanTicketData, setfreshmanTicketData] = useState<{
    [key: string]: number;
  }>(defaultFreshmanTicketData);
  const [generalTicketData, setgeneralTicketData] = useState<{
    [key: string]: number;
  }>(defaultGeneralTicketData);
  const [image, setImage] = useState<{ [key: string]: string }>(defaultImage);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isCandelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);

  // 변경 사항 유무 체크
  const isNotChanged = useMemo(() => {
    return (
      !isChanged(data, defaultData) &&
      !isChanged(image, defaultImage) &&
      !isChanged(freshmanTicketData, defaultFreshmanTicketData) &&
      !isChanged(generalTicketData, defaultGeneralTicketData)
    );
  }, [data, image, freshmanTicketData, generalTicketData]);

  // 수정 취소
  const onCancelEdit = useCallback(() => {
    if (isNotChanged) {
      return;
    }
    setData(defaultData);
    setImage(defaultImage);
    setfreshmanTicketData(defaultFreshmanTicketData);
    setgeneralTicketData(defaultGeneralTicketData);
  }, [isNotChanged]);

  // 변경 사항 저장
  const onSaveEdit = useCallback(() => {
    // [todo] api 연결
    setIsEditModalOpen(false);
  }, []);

  const onChangeData = useCallback((newValue: any, label: string) => {
    setData((prevData) => ({ ...prevData, [label]: newValue }));
  }, []);

  const onChangeImage = useCallback((newValue: string, label: string) => {
    setImage((prevData) => ({ ...prevData, [label]: newValue }));
  }, []);

  const onChangeFreshmanTicketData = useCallback(
    (newValue: number, label: string) => {
      setfreshmanTicketData((prevData) => ({ ...prevData, [label]: newValue }));
    },
    []
  );

  const onChangeGeneralTicketData = useCallback(
    (newValue: number, label: string) => {
      setgeneralTicketData((prevData) => ({ ...prevData, [label]: newValue }));
    },
    []
  );

  return (
    <div className="font-pretendard mx-auto w-full pad:w-[786px] dt:w-[1200px] h-auto flex flex-col gap-[40px]">
      {/* Banner */}
      <Banner>공연 정보 수정</Banner>

      {/* List */}
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

      {/* 취소, 저장 Buttons */}
      <div className="flex flex-row gap-[24px] w-full max-pad:px-[16px] justify-end">
        <AdminButton onClick={onCancelEdit}>취소하기</AdminButton>
        <AdminButton
          disabled={isNotChanged}
          onClick={() => setIsEditModalOpen(true)}
          className={`${isNotChanged ? 'bg-gray-10' : 'bg-primary-50'}`}
        >
          저장하기
        </AdminButton>
        <EditModal
          isOpen={isEditModalOpen}
          setIsOpen={setIsEditModalOpen}
          handleSubmit={onSaveEdit}
        />
      </div>

      {/* admin 홈으로 Button */}
      <div className="flex w-auto h-auto max-pad:mx-[16px]">
        <Link
          href={'/admin'}
          key="admin"
          className="flex flex-row gap-[8px] items-center"
          onClick={() => setIsCancelModalOpen(true)}
        >
          <WestIcon />
          <span className="text-[16px] font-medium">Admin 홈으로</span>
        </Link>
      </div>
      <CancelModal
        isOpen={isCandelModalOpen}
        setIsOpen={setIsCancelModalOpen}
      />
    </div>
  );
};

export default PerformancePage;
