import React from "react";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";
import History from "../components/travel/History";

const MyProfile = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Card small className="mb-4 pt-3">
            <CardHeader className="border-bottom">
              <div className="mb-3 mx-auto">
                <img
                  className="rounded-circle"
                  src="https://blog.getbootstrap.com/assets/brand/bootstrap-logo-shadow@2x.png"
                  width="110"
                  alt="test"
                />
              </div>
              <h4 className="mb-2">훈제오리</h4>
              <span className="text-muted d-block mb-1">elice@elice.com</span>
              {/*<span className="d-block mb-1">설명이 아직 없습니다. 추가해주세요.</span>*/}
            </CardHeader>
            <ListGroup flush>
              <ListGroupItem className="p-4">
                <strong className="text-muted d-block mb-2">
                  설명이 아직 없습니다. 추가해주세요
                </strong>
              </ListGroupItem>
            </ListGroup>

            <span>
              <Button variant="link">편집</Button>
            </span>
          </Card>
        </Col>
      </Row>
      <Row>
        <History></History>
      </Row>
    </Container>
  );
};

export default MyProfile;
