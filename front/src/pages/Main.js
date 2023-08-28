import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Highcharts from "highcharts";
import HighchartsMap from "highcharts/modules/map";
import ExportingModule from "highcharts/modules/exporting";
import ExportDataModule from "highcharts/modules/export-data";
import AccessibilityModule from "highcharts/modules/accessibility";

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
              [0, "#00B9FF"], // Start color for higher values
              [0.5, "#FFFFFF"],
              [1, "#f89b00"], // End color for lower values
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
      // Clean up Highcharts when the component unmounts
      Highcharts.charts.forEach((chart) => {
        if (chart) {
          chart.destroy();
        }
      });
    };
  }, []);

  return (
    <Container fluid style={{ height: "100vh" }}>
      <Row style={{ height: "100%" }}>
        <Col id="container"></Col>
      </Row>
    </Container>
  );
};

export default Main;
