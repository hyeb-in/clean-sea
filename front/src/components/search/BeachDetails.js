import React from 'react';
import { Container, Row, Col, Badge, Table, Alert } from 'react-bootstrap';

const BeachDetails = ({ beachData }) => {
  if (!beachData) return null;

  const formatNumber = (num) => {
    return parseFloat(num).toFixed(3);
  }

  return (
    <Container>
      <Row className="mb-3">
        <Col>
          {beachData.goodnessFit ? (
            <Badge bg="success" className="px-3 m-1" style={{fontSize: '1.5rem'}}>적합</Badge>
          ) : (
            <Badge bg="danger" className="px-3 m-1" style={{fontSize: '1.5rem'}}>부적합</Badge>
          )}
        </Col>
      </Row>

      <Row className="mb-3">
        <h2>{beachData.name}</h2>
        <h4>{beachData.address}</h4>
      </Row>

      <Row>
        <Col md={6}>
          <Table hover responsive>
            <thead>
            <tr>
              <th colSpan="2" style={{backgroundColor: "#e0e0e0"}}>대장균 정보</th>
            </tr>
            </thead>
            <tbody className="table-group-divider">
            <tr>
              <td>검출수</td>
              <td style={{textAlign: "right"}}>{formatNumber(beachData.esch)}</td>
            </tr>
            <tr>
              <td>평균</td>
              <td style={{textAlign: "right"}}>{formatNumber(beachData.eschAvg)}</td>
            </tr>
            <tr>
              <td><u>점수</u></td>
              <td style={{textAlign: "right"}}>{formatNumber(beachData.eschScore)}</td>
            </tr>
            <tr>
              <td>전국 평균 대비 지역 점수</td>
              <td style={{textAlign: "right"}}>{formatNumber(beachData.eschAvgGlobalScore)}</td>
            </tr>
            </tbody>
          </Table>
        </Col>
        <Col md={6}>
          <Table hover>
            <thead>
              <tr>
                <th colSpan="2" style={{backgroundColor: "#e0e0e0"}}>장구균 정보</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
            <tr>
              <td>검출수</td>
              <td style={{textAlign: "right"}}>{formatNumber(beachData.ente)}</td>
            </tr>
            <tr>
              <td>평균</td>
              <td style={{textAlign: "right"}}>{formatNumber(beachData.enteAvg)}</td>
            </tr>
            <tr>
              <td><u>점수</u></td>
              <td style={{textAlign: "right"}}>{formatNumber(beachData.enteScore)}</td>
            </tr>
            <tr>
              <td>전국 평균 대비 지역 점수</td>
              <td style={{textAlign: "right"}}>{formatNumber(beachData.enteAvgGlobalScore)}</td>
            </tr>
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row className="mt-3 p-4">
        <Alert key="info" variant="info">
          <h4 className="mb-0" style={{ textAlign: "center"}}>
            전국 대비 종합 <u>점수</u>: <b>{formatNumber(beachData.globalScore)}</b>
          </h4>
        </Alert>
        <p>점수는 0에 가까울 수록 좋은 수치입니다.</p>
      </Row>
    </Container>
  );
};

export default BeachDetails;
