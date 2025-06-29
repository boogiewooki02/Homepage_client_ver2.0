import { axiosInstance } from '@/api/auth/axios';
import { PerformanceResponse } from '@/types/performace';

export const fetchLatestPerformance =
  async (): Promise<PerformanceResponse | null> => {
    try {
      const res = await axiosInstance.get('/performances/latest-performance');
      return res.data.result.performanceResponse;
    } catch (err) {
      console.error('공연 정보를 불러오지 못했습니다:', err);
      return null;
    }
  };
