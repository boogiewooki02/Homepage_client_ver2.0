'use client';

import * as React from 'react';
import { useState } from 'react';
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

  // 수정 취소
  // [todo] : image에 대한 isChanged 적용 안됨
  const onCancelEdit = () => {
    if (isNotChanged) {
      return;
    }
    setData(defaultData);
    setImage(defaultImage);
    setfreshmanTicketData(defaultFreshmanTicketData);
    setgeneralTicketData(defaultGeneralTicketData);
  };

  const isNotChanged: boolean =
    !isChanged(data, defaultData) &&
    !isChanged(defaultImage, image) &&
    !isChanged(defaultFreshmanTicketData, freshmanTicketData) &&
    !isChanged(defaultGeneralTicketData, generalTicketData);

  // 변경 사항 저장
  const onSaveEdit = () => {
    // [todo] api 연결
    setIsEditModalOpen(false);
  };

  const onChangeData = (newValue: any, label: string) => {
    setData((prevData) => ({ ...prevData, [label]: newValue }));
  };

  const onChangeImage = (newValue: string, label: string) => {
    setImage((prevData) => ({ ...prevData, [label]: newValue }));
  };

  const onChangeFreshmanTicketData = (newValue: number, label: string) => {
    setfreshmanTicketData((prevData) => ({ ...prevData, [label]: newValue }));
  };

  const onChangeGeneralTicketData = (newValue: number, label: string) => {
    setgeneralTicketData((prevData) => ({ ...prevData, [label]: newValue }));
  };

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
          <div className="flex flex-row w-full h-auto gap-[8px]">
            <p className="flex w-[120px] pad:w-[160px] h-[48px] items-center">
              신입생
            </p>
            <InfoList
              data={freshmanTicketData}
              fieldList={freshmanTiketInfoList}
              onChange={onChangeFreshmanTicketData}
            />
          </div>
          <div className="flex flex-row w-full h-auto gap-[8px]">
            <p className="flex w-[120px] pad:w-[160px] h-[48px] items-center">
              일반
            </p>
            <InfoList
              data={generalTicketData}
              fieldList={generalTiketInfoList}
              onChange={onChangeGeneralTicketData}
            />
          </div>
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
