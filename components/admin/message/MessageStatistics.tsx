import React, { useEffect, useState } from 'react';

import { authInstance } from '@/api/auth/axios';
import PieChart from '@/components/admin/applicant/PieChart';

const MessageStatistics = () => {
  const [chartData, setChartData] = useState<any>(null);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchData = async () => {
    try {
      const response = await authInstance.get('/admin/apply/statistics');
      const { result } = response.data;

      const labels = ['참', '불참', '미정'];
      const counts = [
        result.vocal_count,
        result.drum_count,
        result.guitar_count,
        result.bass_count,
        result.synthesizer_count,
      ];

      const baseColors = ['#1A2F9E', '#BCC6FB', '#DDE2FD'];

      const sortedData = labels
        .map((label, index) => ({
          label,
          count: counts[index],
        }))
        .sort((a, b) => b.count - a.count);
      const sortedLabels = sortedData.map((item) => item.label);
      const sortedCounts = sortedData.map((item) => item.count);
      const sortedColors = baseColors.slice(0, sortedCounts.length);

      setTotalCount(result.total_apply_count);
      const newData = {
        labels: sortedLabels,
        datasets: [
          {
            data: sortedCounts,
            backgroundColor: sortedColors,
            borderWidth: 1,
          },
        ],
      };

      setChartData(newData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!chartData) {
    return <div className="w-80 h-80 flex justify-center items-center" />;
  }

  return (
    <div className="w-full h-auto gap-6 rounded-b-[24px] bg-gray-5 py-6 px-10 box-border">
      <div className="flex items-center">
        <span className="text-[24px] font-semibold text-gray-900">
          행사 참여인원
        </span>
        <span className="ml-4 text-primary-50 text-[20px]">{totalCount}</span>
      </div>
      <PieChart chartData={chartData} />
    </div>
  );
};

export default MessageStatistics;
