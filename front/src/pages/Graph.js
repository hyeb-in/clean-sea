import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "react-apexcharts";
import { Container, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import * as Api from "../Api";
const Graph = () => {
  const chartRef = useRef(null);
  const [selectedYear, setSelectedYear] = useState("2023");

  const [chartData, setChartData] = useState({
    series: [
      {
        name: "대장균",
        data: [],
      },
      {
        name: "장구균",
        data: [],
      },
    ],
  });

  const options = {
    series: chartData.series,
    xaxis: {
      categories: [
        "강원",
        "경남",
        "경북",
        "인천",
        "울산",
        "부산",
        "전남",
        "전북",
        "제주",
        "충남",
      ],
    },
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    yaxis: {
      title: {
        text: "검출 수",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + "개 검출";
        },
      },
    },
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
  };
  // beaches/beachesbyregion/강원/2015

  useEffect(() => {
    Api.get("beaches/beaches")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const fetchData = () => {
      Api.get("beaches", `${selectedYear}/`)
        .then((response) => {
          // API 응답에서 데이터를 추출하고 상태에 저장합니다.
          const data = response.data;
          const eschAvgData = data.map((item) => item.eschAvg); // 대장균 데이터
          const enteAvgData = data.map((item) => item.enteAvg); // 장구균 데이터

          const updatedChartData = {
            series: [
              {
                name: "대장균",
                data: eschAvgData,
              },
              {
                name: "장구균",
                data: enteAvgData,
              },
            ],
          };

          setChartData(updatedChartData); // 상태를 업데이트합니다.
        })
        .catch((error) => {
          console.error("API 호출 중 오류 발생:", error);
        });
    };
    if (selectedYear) {
      fetchData();
      //   // mocking
      //   const yearsData = {
      //     "2023": [
      //         {
      //         eschAvg: 10,
      //         enteAvg: 11,
      //     },{
      //         eschAvg: 10,
      //         enteAvg: 11,
      //     },{
      //         eschAvg: 10,
      //         enteAvg: 11,
      //     },{
      //         eschAvg: 10,
      //         enteAvg: 11,
      //     },{
      //         eschAvg: 10,
      //         enteAvg: 11,
      //     },{
      //         eschAvg: 10,
      //         enteAvg: 11,
      //     },{
      //         eschAvg: 10,
      //         enteAvg: 11,
      //     },{
      //         eschAvg: 10,
      //         enteAvg: 11,
      //     },{
      //         eschAvg: 10,
      //         enteAvg: 11,
      //     },{
      //         eschAvg: 10,
      //         enteAvg: 11,
      //     }
      //     ],
      //     "2014": [{
      //         eschAvg: 40,
      //         enteAvg: 50,
      //     },{
      //         eschAvg: 40,
      //         enteAvg: 50,
      //     },{
      //         eschAvg: 40,
      //         enteAvg: 50,
      //     },{
      //         eschAvg: 40,
      //         enteAvg: 50,
      //     },{
      //         eschAvg: 40,
      //         enteAvg: 50,
      //     },{
      //         eschAvg: 40,
      //         enteAvg: 50,
      //     },{
      //         eschAvg: 40,
      //         enteAvg: 50,
      //     },{
      //         eschAvg: 40,
      //         enteAvg: 50,
      //     },{
      //         eschAvg: 40,
      //         enteAvg: 50,
      //     },{
      //         eschAvg: 40,
      //         enteAvg: 50,
      //     }]
      //     }
      //   const data = yearsData[selectedYear]
      //   console.log(data);
      //   console.log(yearsData);
      //   console.log(selectedYear);
      //   console.log(typeof selectedYear);
      // const eschAvgData = data.map((item) => item.eschAvg); // 대장균 데이터
      //       const enteAvgData = data.map((item) => item.enteAvg); // 장구균 데이터

      //       const updatedChartData = {
      //         series: [
      //           {
      //             name: '대장균',
      //             data: eschAvgData
      //           },
      //           {
      //             name: '장구균',
      //             data: enteAvgData
      //           }
      //         ]
      //       };

      //       setChartData(updatedChartData); // 상태를 업데이트합니다.;
    }
  }, [selectedYear]);

  useEffect(() => {
    if (!chartRef.current) {
      chartRef.current = new ApexCharts(
        document.querySelector("#chart"),
        options
      );
      chartRef.current.render();
    }
  }, [options]);

  return (
    <Container>
      <Row>
        <Col xs={4} className="px-0">
          <Dropdown>
            <DropdownButton
              id="year-dropdown"
              title={selectedYear}
              onSelect={handleYearSelect}
            >
              {[2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023].map(
                (year) => (
                  <Dropdown.Item eventKey={year}>{year}년</Dropdown.Item>
                )
              )}
            </DropdownButton>
          </Dropdown>
        </Col>
      </Row>
      <Row>
        <div id="chart">
          <ApexCharts
            options={options}
            series={chartData.series}
            type="bar"
            height={350}
          />
        </div>
      </Row>
    </Container>
  );
};

export default Graph;
