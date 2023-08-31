import React from 'react';
import { Container, Row, Col, Badge, Table, Alert } from 'react-bootstrap';

const BeachDetails = ({ beachData }) => {
  if (!beachData) return null;

  return (
    <Container>
      <Row className="mb-3">
        <Col>
          {/* goodnessFit에 따라 빨간색 혹은 초록색 박스로 표시 */}
          {beachData.goodnessFit ? (
            <Badge bg="success" className="p-2 m-2">적합</Badge>
          ) : (
            <Badge bg="danger" className="p-2 m-2">부적합</Badge>
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
              <th colSpan="2" style={{backgroundColor: "#e0e0e0"}}>ESCH 정보</th>
            </tr>
            </thead>
            <tbody className="table-group-divider">
            <tr>
              <td>값</td>
              <td>{beachData.esch}</td>
            </tr>
            <tr>
              <td>평균</td>
              <td>{beachData.eschAvg}</td>
            </tr>
            <tr>
              <td>점수</td>
              <td>{beachData.eschScore}</td>
            </tr>
            <tr>
              <td>전국 평균 대비 점수</td>
              <td>{beachData.eschAvgGlobalScore}</td>
            </tr>
            </tbody>
          </Table>
        </Col>
        <Col md={6}>
          <Table hover>
            <thead>
              <tr>
                <th colSpan="2" style={{backgroundColor: "#e0e0e0"}}>ENTE 정보</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
            <tr>
              <td>값</td>
              <td>{beachData.ente}</td>
            </tr>
            <tr>
              <td>평균</td>
              <td>{beachData.enteAvg}</td>
            </tr>
            <tr>
              <td>점수</td>
              <td>{beachData.enteScore}</td>
            </tr>
            <tr>
              <td>전국 평균 대비 점수</td>
              <td>{beachData.enteAvgGlobalScore}</td>
            </tr>
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row className="mt-3 p-4">
        <Alert key="info" variant="info">
          <h4>전국 대비 종합 점수: {beachData.sumGerms}</h4>
        </Alert>
      </Row>
    </Container>
  );
};

export default BeachDetails;
