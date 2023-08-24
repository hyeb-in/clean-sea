import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "react-apexcharts";
import { Container, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import axios from "axios"; // Axios를 사용하여 API 요청을 보낼 수 있도록 import합니다.
import * as Api from "../Api";

const Graph = () => {
  const chartRef = useRef(null);
  const [selectedRegion, setSelectedRegion] = useState("지역을 선택해주세요");
  const [selectedYear, setSelectedYear] = useState("년도를 선택해주세요");
  // API로부터 받은 데이터를 저장할 상태
  const [chartData, setChartData] = useState({
    // series: [
    //   {
    //     name: "대장균",
    //     data: [22, 11, 44, 55, 57, 56, 61, 58, 63, 60, 66, 11],
    //   },
    //   {
    //     name: "장구균",
    //     data: [55, 44, 76, 85, 101, 98, 87, 105, 91, 114, 94, 23],
    //   },
    // ],
  });

  //  해변 interface
  // interface IBeach {
  //   id: number;
  //   name: string;
  //   address: string;
  //   goodnessFit?: boolean;
  //   eschScore?: number,
  //   enteScore?: number,
  //   ente?: number;
  //   esch?: number;
  //   latitude?: number;
  //   longitude?: number;
  // }
  // const options = {
  //   series: [
  //     {
  //       name: "대장균",
  //       data: [22, 11, 44, 55, 57, 56, 61, 58, 63, 60, 66, 11],
  //     },
  //     {
  //       name: "장구균",
  //       data: [55, 44, 76, 85, 101, 98, 87, 105, 91, 114, 94, 23],
  //     },
  //   ],
  //   xaxis: {
  //     categories: [
  //       "1월",
  //       "2월",
  //       "3월",
  //       "4월",
  //       "5월",
  //       "6월",
  //       "7월",
  //       "8월",
  //       "9월",
  //       "10월",
  //       "11월",
  //       "12월",
  //     ],
  //   },
  //   chart: {
  //     type: "bar",
  //     height: 350,
  //   },
  //   plotOptions: {
  //     bar: {
  //       horizontal: false,
  //       columnWidth: "55%",
  //       endingShape: "rounded",
  //     },
  //   },
  //   dataLabels: {
  //     enabled: false,
  //   },
  //   stroke: {
  //     show: true,
  //     width: 2,
  //     colors: ["transparent"],
  //   },
  //   yaxis: {
  //     title: {
  //       text: "검출 수",
  //     },
  //   },
  //   fill: {
  //     opacity: 1,
  //   },
  //   tooltip: {
  //     y: {
  //       formatter: function (val) {
  //         return val + "개 검출";
  //       },
  //     },
  //   },
  // };

  // app.ts 라우팅: app.use("/beaches", beachRouter);

  // api path url
  // '/beachesbyregion/:address/:year
  // '/beachbyId/:_id'
  // '/beaches'

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    // fetchData(region, selectedYear);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    // fetchData(selectedRegion, year);
  };

  const fetchData = () => {
    // API를 호출하여 데이터를 가져옵니다.
    Api.get(`/beaches/beaches`)
      .then((response) => {
        // API 응답에서 데이터를 추출하고 상태에 저장합니다.
        console.log(response);
        // setChartData(data);
      })
      .catch((error) => {
        console.error("API 호출 중 오류 발생:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   if (!chartRef.current) {
  //     chartRef.current = new ApexCharts(
  //       document.querySelector("#chart"),
  //       options
  //     );
  //     chartRef.current.render();
  //   }

  //   return () => {
  //     if (chartRef.current) {
  //       // chartRef.current.destroy();
  //     }
  //   };
  // }, [options]);

  return (
    <Container>
      <Row>
        <Col xs={4} className="px-0">
          <Dropdown>
            <DropdownButton
              id="region-dropdown"
              title={selectedRegion}
              onSelect={handleRegionSelect}
            >
              <Dropdown.Item eventKey="강원">강원</Dropdown.Item>
              <Dropdown.Item eventKey="부산">부산</Dropdown.Item>
              <Dropdown.Item eventKey="충남">충남</Dropdown.Item>
            </DropdownButton>
          </Dropdown>
        </Col>
        <Col xs={4} className="px-0">
          <Dropdown>
            <DropdownButton
              id="year-dropdown"
              title={selectedYear}
              onSelect={handleYearSelect}
            >
              <Dropdown.Item eventKey="2014">2014년</Dropdown.Item>
              <Dropdown.Item eventKey="2015">2015년</Dropdown.Item>
              <Dropdown.Item eventKey="2016">2016년</Dropdown.Item>
            </DropdownButton>
          </Dropdown>
        </Col>
      </Row>
      <Row>
        {/* <div id="chart">
          <ApexCharts
            options={options}
            series={chartData.series}
            type="bar"
            height={350}
          />
        </div> */}
      </Row>
    </Container>
  );
};

export default Graph;
