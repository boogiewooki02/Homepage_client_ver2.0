import { InputFieldType } from '@/components/ui/admin/type';

export const performanceImage: InputFieldType = {
  title: 'poster',
  label: 'poster_image_url',
  type: 'image',
  required: true,
};

export const performanceInfoList: InputFieldType[] = [
  {
    title: '공연 제목',
    label: 'title',
    type: 'text',
    required: true,
    inputType: 'text',
  },
  {
    title: '장소',
    label: 'venue',
    type: 'text',
    required: true,
    inputType: 'text',
  },
  {
    title: '장소',
    label: 'address',
    type: 'text',
    required: true,
    inputType: 'text',
  },
  {
    title: '일시',
    label: 'dateTime',
    type: 'datetime',
    required: true,
  },
  {
    title: '예매 시작일',
    label: 'bookingStartDate',
    type: 'datetime',
    required: true,
  },
  {
    title: '예매 마감일',
    label: 'bookingEndDate',
    type: 'datetime',
    required: true,
  },
];

export const freshmanTiketInfoList: InputFieldType[] = [
  {
    title: '가격',
    label: 'freshmanPrice',
    type: 'text',
    required: true,
    inputType: 'number',
  },
  {
    title: '최대 구매 수량',
    label: 'freshmanMaxPurchase',
    type: 'text',
    required: true,
    inputType: 'number',
  },
];

export const generalTiketInfoList: InputFieldType[] = [
  {
    title: '가격',
    label: 'generalPrice',
    type: 'text',
    required: true,
    inputType: 'number',
  },
  {
    title: '최대 구매 수량',
    label: 'generalMaxPurchase',
    type: 'text',
    required: true,
    inputType: 'number',
  },
];

export const defaultImage = {
  poster_image_url:
    'https://contents.lotteon.com/itemimage/20241109010839/LM/76/10/59/42/53/71/8_/00/1/LM7610594253718_001_1.jpg/dims/optimize/dims/resizemc/400x400',
};

export const defaultData = {
  // [todo] api 연결
  title: '2024년 9월 정기 공연',
  venue: '001 클럽',
  address: '서울 마포구 월드컵북로2길 49',
  dateTime: '2022-04-17T15:30',
  bookingStartDate: '2022-04-17T15:30',
  bookingEndDate: '2022-04-17T15:30',
};

export const defaultFreshmanTicketData = {
  // [todo] api 연결
  freshmanPrice: 0,
  freshmanMaxPurchase: 1,
};

export const defaultGeneralTicketData = {
  // [todo] api 연결
  generalPrice: 5000,
  generalMaxPurchase: 5,
};
