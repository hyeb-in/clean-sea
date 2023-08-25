import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "react-apexcharts";
import { Container, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import axios from "axios"; // Axios를 사용하여 API 요청을 보낼 수 있도록 import합니다.
import * as Api from "../Api";

// Initialize Highcharts modules
HighchartsMap(Highcharts);
ExportingModule(Highcharts);
ExportDataModule(Highcharts);
AccessibilityModule(Highcharts);

const Main = () => {
  useEffect(() => {
    // Highmaps uses TopoJSON, not GeoJSON, so we load a TopoJSON map
    fetch("https://code.highcharts.com/mapdata/countries/kr/kr-all.geo.json")
      .then((response) => response.json())
      .then((mapData) => {
        // Prepare demo data
        const data = [
          ['kr-cb', 11],         //전북
          ['kr-kn', 13],        //경남
          ['kr-2685', 14],      //전남
          ['kr-pu', 15],        //부산
          ['kr-2688', 16],      //경북
          ['kr-ul', 19],        //울산
          ['kr-in', 20],        //인천
          ['kr-kw', 21],        //강원
          ['kr-gn', 22],        //충남
          ['kr-cj', 23],        //제주
        ];

        // Create the chart
        Highcharts.mapChart("container", {
          chart: {
            map: mapData,
          },

          title: {
            text: "지역 해수욕장 평균 수질적합도",
          },

          subtitle: {
            text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/kr/kr-all.geo.json">South Korea</a>',
          },

          mapNavigation: {
            enabled: true,
            buttonOptions: {
              verticalAlign: "bottom",
            },
          },

          colorAxis: {
            stops: [
              [0, "#0000FF"], // Start color for higher values
              [1, "#FFFFFF"], // End color for lower values
            ],
          },

          series: [
            {
              data: data,
              name: "수질적합도",
              states: {
                hover: {
                  color: "#BADA55",
                },
              },
              dataLabels: {
                enabled: true,
                format: "{point.name}",
              },
            },
          ],
        });
      });

    return () => {
      if (chartRef.current) {
        // chartRef.current.destroy();
      }
    };
  }, [chartOptions]);

  return (
    <Container>
      <Row>
        <Col xs={4} className="px-0">
          <Dropdown>
            <DropdownButton
              id="region-dropdown"
              title={selectedRegion}
              onSelect={handleRegionSelect} // onSelect에 이벤트 핸들러 함수를 연결합니다.
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
