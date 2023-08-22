import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ApexCharts from "apexcharts"; // Import from 'react-apexcharts' instead of 'apexcharts'

const options = {
  series: [
    {
      data: [
        { x: "강원", y: 1.2 },
        { x: "경남", y: 0.4 },
        { x: "경북", y: -1.4 },
        { x: "부산", y: 2.7 },
        { x: "울산", y: -0.5 },
        { x: "전남", y: 0.1 },
        { x: "전북", y: -2.3 },
        { x: "충남", y: 2.1 },
        { x: "제주", y: 0.3 },
        { x: "인천", y: 0.12 },
      ],
    },
  ],
  legend: {
    show: false,
  },
  chart: {
    height: 500,
    widht: 300,
    type: "treemap",
  },
  title: {
    text: "뭐로 정할까요?",
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: "15px",
    },
    formatter: function (text, op) {
      return [text, op.value];
    },
    offsetY: -4,
  },
  plotOptions: {
    treemap: {
      enableShades: true,
      shadeIntensity: 0.5,
      reverseNegativeShade: true,
      colorScale: {
        ranges: [
          { from: -6, to: 0, color: "#E02828" },
          { from: 0.01, to: 6, color: "#1aa3ff" },
        ],
      },
    },
  },
};

const Main = () => {
  useEffect(() => {
    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <Container fluid style={{ height: "100vh" }}>
      <Row style={{ height: "100%" }}>
        <Col id="chart"></Col>
      </Row>
    </Container>
  );
};

export default Main;
