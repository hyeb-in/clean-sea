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
          ['kr-4194', 10],
          // Add more data points as needed
        ];

        // Create the chart
        Highcharts.mapChart("container", {
          chart: {
            map: mapData,
          },

          title: {
            text: "Highcharts Maps basic demo",
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
            min: 0,
          },

          series: [
            {
              data: data,
              name: "Random data",
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
