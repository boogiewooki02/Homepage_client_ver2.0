import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  ChartDataset,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { authInstance } from '@/api/auth/axios';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface CustomChartDataset extends ChartDataset<'pie'> {
  percentData?: number[]; // percentData 속성 추가
}

const PieChart: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);

  const fetchData = async () => {
    try {
      const response = await authInstance.get('/admin/apply/statistics');
      const result = response.data.result;

      const labels = ['보컬', '드럼', '기타', '베이스', '신디사이저'];
      const percent = [
        result.vocal_percent,
        result.drum_percent,
        result.guitar_percent,
        result.bass_percent,
        result.synthesizer_percent,
      ];
      const counts = [
        result.vocal_count,
        result.drum_count,
        result.guitar_count,
        result.bass_count,
        result.synthesizer_count,
      ];

      const newData = {
        labels,
        datasets: [
          {
            data: counts,
            backgroundColor: [
              '#1A2F9E',
              '#3352F2',
              '#798DF7',
              '#BCC6FB',
              '#DDE2FD',
            ],
            percentData: percent, // 퍼센트 값 추가
            borderWidth: 1,
          },
        ] as CustomChartDataset[], // CustomChartDataset로 타입 지정
      };

      setChartData(newData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const options: ChartOptions<'pie'> = {
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 60,
          boxHeight: 24,
          font: { size: 16 },
        },
      },
      datalabels: {
        color: '#fff',
        font: {
          size: 14,
        },
        formatter: (value, context) => {
          if (value === 0) return ''; // 0인 경우 라벨 표시 안 함

          // CustomChartDataset로 타입 캐스팅
          const dataset = context.dataset as CustomChartDataset;
          const percent = dataset.percentData?.[context.dataIndex] ?? 0; // 퍼센트 값 가져오기
          return `${percent}% (${value})`; // 퍼센트와 값 표시
        },
      },
    },
  };

  if (!chartData) {
    return (
      <div className="w-80 h-80 flex justify-center items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="w-80 h-80 flex justify-center items-center">
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
