import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, ChartDataLabels);

interface PieChartProps {
  chartData: any; // 전달받는 chartData의 타입
}

const PieChart: React.FC<PieChartProps> = ({ chartData }) => {
  const [legendPosition, setLegendPosition] = useState<'right' | 'bottom'>(
    'right'
  );

  useEffect(() => {
    // 화면 크기에 따라 legend 위치 변경
    const handleResize = () => {
      if (window.innerWidth >= 1500) {
        setLegendPosition('right');
      } else {
        setLegendPosition('bottom');
      }
    };

    // 초기 설정
    handleResize();

    // 리사이즈 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);

    // 클린업
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const options: ChartOptions<'pie'> = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: '#fff',
        font: {
          size: 14,
        },
        formatter: (value, context) => {
          if (value === 0) return '';
          const dataset = context.dataset;
          const percent =
            ((value / (dataset.data as number[]).reduce((a, b) => a + b, 0)) *
              100) |
            0;
          return `${percent}% (${value})`;
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        right: legendPosition === 'right' ? 24 : 0,
      },
    },
  };

  const customLegend = chartData?.labels.map((label: string, index: number) => (
    <div key={index} className="flex items-center mb-4">
      <div
        style={{
          width: '60px',
          height: '24px',
          backgroundColor: chartData.datasets[0].backgroundColor[index],
          marginRight: '16px',
        }}
      ></div>
      <span className="text-[16px]">{label}</span>
    </div>
  ));

  return (
    <div
      className={`w-full flex ${
        legendPosition === 'right' ? 'flex-row' : 'flex-col'
      } items-center justify-center`}
    >
      <div
        className="flex items-center justify-center"
        style={{
          width: '280px', // 차트 컨테이너 크기
          height: '280px',
          padding: '37.62px',
        }}
      >
        <Pie data={chartData} options={options} />
      </div>
      <div
        className={`${
          legendPosition === 'right' ? 'ml-6 mt-12' : 'mt-6'
        } flex flex-col`}
      >
        {customLegend}
      </div>
    </div>
  );
};

export default PieChart;
