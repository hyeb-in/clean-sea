import React, { useEffect, useRef } from "react";
import ApexCharts from 'react-apexcharts';

const options = {
  series: [{
    name: '대장균',
    data: [22, 11, 44, 55, 57, 56, 61, 58, 63, 60, 66, 11]
  }, {
    name: '장구균',
    data: [55, 44, 76, 85, 101, 98, 87, 105, 91, 114, 94, 23]
  }],
  xaxis: {
    categories: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  },
  chart: {
    type: 'bar',
    height: 350
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded'
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  yaxis: {
    title: {
      text: '검출 수'

    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + "개 검출"
      }
    }
  }
};

const Graph = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) {
      chartRef.current = new ApexCharts(document.querySelector("#chart"), options);
      chartRef.current.render();
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div>
      <ApexCharts options={options} series={options.series} type="bar" height={350} />
    </div>
  );
};

export default Graph;