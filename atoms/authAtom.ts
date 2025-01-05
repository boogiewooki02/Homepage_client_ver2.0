import { atom } from 'recoil';

export const isLoggedInState = atom({
  key: 'isLoggedInState', // 상태의 고유 키
  default: false, // 기본값
});
