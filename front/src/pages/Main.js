import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Highcharts from "highcharts";
import HighchartsMap from "highcharts/modules/map";
import ExportingModule from "highcharts/modules/exporting";
import ExportDataModule from "highcharts/modules/export-data";
import AccessibilityModule from "highcharts/modules/accessibility";
// import "./font/font.css";

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
          ["kr-cb", 0.32], //전북
          ["kr-kn", 4.93], //경남
          ["kr-2685", 0.68], //전남
          ["kr-pu", 5.05], //부산
          ["kr-2688", 0.96], //경북
          ["kr-ul", 3.52], //울산
          ["kr-in", 7.96], //인천
          ["kr-kw", 0.75], //강원
          ["kr-gn", 0.6], //충남
          ["kr-cj", 1.12], //제주
        ];

        // Create the chart
        Highcharts.mapChart("container", {
          chart: {
            map: mapData,
            backgroundColor: "transparent", // 백그라운드를 투명하게 설정
          },

          title: {
            text: "깨끗 海",
            style: {
              fontSize: "24px",
              fontWeight: "bold",
            },
          },

          subtitle: {
            text: "해수욕장 평균 수질 적합도",
            style: {
              fontSize: "18px",
            },
          },

          mapNavigation: {
            enabled: false,
          },

          exporting: {
            enabled: false,
          },

          colorAxis: {
            stops: [
              [0, "#00B9FF"], // Start color for higher values
              [0.5, "#FFFFFF"],
              [1, "#f89b00"], // End color for lower values
            ],
          },

          series: [
            {
              data: data,
              name: "수질적합도",
              animation: {
                duration: 1500, // 애니메이션 지속 시간 (밀리초)
                easing: "easeOutBounce", // 애니메이션 이징 함수
              },
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
      // Clean up Highcharts when the component unmounts
      Highcharts.charts.forEach((chart) => {
        if (chart) {
          chart.destroy();
        }
      });
    };
  }, []);

  return (
    <Container fluid style={{ width: "100%", height: "100%", backgroundSize: "cover" }}>
      <Row className="align-items-center" style={{ height: "100vh" }}>
        <Col md={6} className="text-center">
          <img
            className="kakaoImage"
            src="../img/kakao1.png"
            style={{
              width: "450px",
              height: "auto",
            }}
            alt="Kakao Image"
          />
        </Col>
        <Col md={6}>
          <div className="text-center">
            <p style={{ fontSize: "18px", lineHeight: "1.5", fontFamily: 'Black Han Sans, sans-serif' }}>
              여름철 해수욕장, 좋은 수질의 해수욕장 어딨을까?<br />
              깨끗 海 서비스를 통해 보다 빠르게 깨끗한 해수욕장을 찾아보세요!
            </p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col id="container" style={{ width: "100%", height: "800px" }} ></Col>
      </Row>
    </Container>
  );
};

export default Main;
