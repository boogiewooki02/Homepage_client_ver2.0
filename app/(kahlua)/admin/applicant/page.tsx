'use client';
import Image from 'next/image';
import React, { useEffect } from 'react';
import applicant_image from '@/public/image/admin/image.svg';
import { useState } from 'react';
import ApplicantCard from '@/components/admin/applicant/ApplicantCard';
import chevron_down_blue from '@/public/image/performance/chevron-down-blue.svg';
import { useRouter } from 'next/navigation';
import { authInstance } from '@/api/auth/axios';
import { totalApplicant } from '@/atoms';
import { useRecoilState } from 'recoil';
import { DynamicRecruitingInfo } from '@/components/data/RecruitingInfo';
import PublishIcon from '@mui/icons-material/Publish';
import Link from 'next/link';
import WestIcon from '@mui/icons-material/West';

interface ApplicantProps {
  id: number;
  name: string;
  phone_num: string;
  birth_date: string;
  gender: string;
  address: string;
  major: string;
  first_preference: string;
  second_preference: string;
  motive: string;
  experience_and_reason: string;
  play_instrument: string;
  readiness: string;
}

const page = () => {
  const router = useRouter();
  const sessionArr = ['ALL', '보컬', '기타', '드럼', '베이스', '신디'];
  const [session, setSession] = useState('ALL');
  const [applicantList, setApplicantList] = useState<ApplicantProps[]>([]);
  const [shownList, setShownList] = useState<ApplicantProps[]>([]);
  const [total, setTotal] = useRecoilState(totalApplicant);
  const [showMore, setShowMore] = useState(false);

  const getList = async () => {
    try {
      const response = await authInstance.get('/admin/apply/download', {
        responseType: 'blob',
      });
      console.log(response.data);

      const blob = response.data;

      const fileObjectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = fileObjectUrl;
      link.style.display = 'none';

      link.download = 'applicant_list.xlsx';

      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(fileObjectUrl);
    } catch (error: any) {}
  };

  const handleMore = () => {
    setShowMore(!showMore);
  };

  const fetchAllApplicantList = async () => {
    try {
      const response = await authInstance.get('/admin/apply/all');
      setApplicantList(response.data.result.applies);
      setShownList(response.data.result.applies.slice(0, 9));
      setTotal(response.data.result.total);
    } catch (error) {}
  };

  const fetchApplicantList = async (session: string) => {
    var preference = '';

    if (session === '보컬') {
      preference = 'VOCAL';
    } else if (session === '기타') {
      preference = 'GUITAR';
    } else if (session === '드럼') {
      preference = 'DRUM';
    } else if (session === '베이스') {
      preference = 'BASS';
    } else if (session === '신디') {
      preference = 'SYNTHESIZER';
    } else {
      fetchAllApplicantList();
      return;
    }
    try {
      const response = await authInstance.get(
        `/admin/apply?preference=${preference}`
      );
      setApplicantList(response.data.result.applies);
      setShownList(response.data.result.applies.slice(0, 9));
    } catch (error) {}
  };

  useEffect(() => {
    if (showMore) {
      setShownList(applicantList);
    } else {
      setShownList(applicantList.slice(0, 9));
    }
  }, [showMore]);

  useEffect(() => {
    fetchAllApplicantList();
  }, []);

  useEffect(() => {
    fetchApplicantList(session);
  }, [session]);

  return (
    <div className="w-full h-full">
      <div className="font-pretendard w-full pt-16 flex flex-col items-center">
        <div className="w-full h-auto min-h-[180px] pad:h-[240px] bg-gray-5 flex flex-col pad:flex-row justify-between px-4 pad:px-8 dt:px-[120px]">
          <div className="flex flex-col mt-6 pad:mt-12">
            <span className="font-mustica text-[28px] pad:text-[36px] text-gray-90 font-semibold leading-10 pb-3">
              Applicant
            </span>
            <section className="flex gap-2 pb-4 pad:pb-8 items-center">
              <span className="font-pretendard text-lg pad:text-xl text-gray-90 font-semibold leading-9">
                {DynamicRecruitingInfo.num}기 지원자 정보
              </span>
              <span className="font-pretendard text-lg pad:text-xl text-primary-50 font-semibold leading-9">
                {total}
              </span>
              <span
                className="w-4 px-4 cursor-pointer"
                onClick={() => getList()}
              >
                <PublishIcon sx={{ color: '#757A95' }} />
              </span>
            </section>
            <section className="w-full pad:w-[480px] h-8 rounded-[32px] bg-gray-0 overflow-x-auto whitespace-nowrap">
              <div className="inline-flex">
                {sessionArr.map((sessionName) => (
                  <div
                    key={sessionName}
                    onClick={() => {
                      setSession(sessionName);
                    }}
                    className={`${
                      session === sessionName ? 'bg-primary-50' : 'bg-gray-0'
                    } min-w-[80px] inline-flex px-3 py-1 justify-center items-center gap-2 rounded-[32px] cursor-pointer`}
                  >
                    <span
                      className={`${
                        session === sessionName ? 'text-gray-0' : 'text-gray-50'
                      } text-center font-pretendard text-[14px] pad:text-[16px] font-medium leading-6`}
                    >
                      {sessionName}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <div className="hidden pad:block pad:mt-8">
            <Image src={applicant_image} alt="image" width={320} height={208} />
          </div>
        </div>
        <div className="w-full h-full px-4 pad:px-8 dt:px-[120px] pt-6 pad:pt-8 grid grid-cols-1 pad:grid-cols-2 dt:grid-cols-3 gap-x-4 pad:gap-x-6 gap-y-6 pad:gap-y-8">
          {shownList.map((applicant) => (
            <ApplicantCard
              key={applicant.id}
              id={applicant.id}
              name={applicant.name}
              phone_num={applicant.phone_num}
              birth_date={applicant.birth_date}
              gender={applicant.gender}
              address={applicant.address}
              major={applicant.major}
              first_preference={applicant.first_preference}
              second_preference={applicant.second_preference}
            />
          ))}
        </div>
        <div
          onClick={handleMore}
          className="flex mt-8 pad:mt-12 gap-2 cursor-pointer mb-8"
        >
          {showMore ? (
            <span className="text-primary-50 text-center text-base pad:text-lg font-medium">
              닫기
            </span>
          ) : (
            <span className="text-primary-50 text-center text-base pad:text-lg font-medium">
              더보기
            </span>
          )}
          {showMore ? (
            <Image
              style={{ transform: 'rotate(180deg)' }}
              src={chevron_down_blue}
              alt="more"
              width={16}
              height={16}
            />
          ) : (
            <Image src={chevron_down_blue} alt="more" width={16} />
          )}
        </div>
      </div>
      <div className="flex h-auto mx-auto w-full px-4 pad:px-8 dt:px-[120px]">
        <Link
          href={'/admin'}
          key="admin"
          className="flex flex-row gap-2 items-center my-6"
        >
          <WestIcon />
          <span className="text-[16px] font-medium">Admin 홈으로</span>
        </Link>
      </div>
    </div>
  );
};

export default page;
