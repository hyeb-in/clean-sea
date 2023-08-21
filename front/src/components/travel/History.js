import React, { useState, useEffect, useContext  } from 'react'
import { Col, Container, Row, Card, Button, Modal, FormControl } from "react-bootstrap";
import * as Api from "../../Api";
import { UserStateContext } from "../../App";
import TravelItem from './TravelItem';

const History = () => {
  const [travels, setTravels] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(UserStateContext);
  const [newTravel, setNewTravel] = useState({
    author: user._id,
    beachId: '',
    date: ''
  });

  const handleModalClose = () => setShowModal(false);
  const handleModalOpen = () => setShowModal(true);

  const fetchTravelList = async () => {
    try {
      const response = await Api.get('travels/travelList');
      console.log(response);
      setTravels(response.data);
    } catch (error) {
      console.error('방문 로그 조회 실패:', error);
    }
  };
  const handleNewTravelSubmit = async () => {
    try {
      const travelData = { ...newTravel, date: new Date(newTravel.date) };
      await Api.post('travels/register', travelData);
    } catch (error) {
      console.error('새로운 여행 정보 등록 실패:', error);
    }

    await fetchTravelList();
    handleModalClose();
  };

  useEffect(() => {
    fetchTravelList();
  }, []);

  const handleTravelUpdate = (travelId, updatedTravel) => {
    const updatedTravels = travels.map(travel => travel._id === travelId ? updatedTravel : travel);
    setTravels(updatedTravels);
  };

  return (
    <>
      <Container>
        <Card className="mb-4 mt-4 pt-3">
          <Card.Body>
            <Row className="mt-4">
              <Col>
                <h3 className="mb-3">방문 로그</h3>
              </Col>
              <Col xs={6} className="d-flex justify-content-end">
                <Button
                  size="sm" style={{ marginTop: '5px', marginBottom: '5px' }}
                  onClick={handleModalOpen}
                >
                  로그 작성
                </Button>
              </Col>
              <Col xs={1}>
                {/*여백용 빈 컬럼*/}
              </Col>
            </Row>
            <Row>
              <Col>
                {travels.length > 0 ? (
                  travels.map((travel, index) => (
                    <TravelItem key={index} travelData={travel} onTravelUpdate={handleTravelUpdate} />
                  ))
                ) : (
                  <p className="m-2">방문 로그가 없습니다</p>
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>새 방문 로그 작성</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormControl
              type="text"
              placeholder="해수욕장 id"
              value={newTravel.beachId}
              onChange={(e) => setNewTravel({ ...newTravel, beachId: e.target.value })}
            />
            <FormControl
              type="date"
              className="mt-2"
              value={newTravel.date}
              onChange={(e) => setNewTravel({ ...newTravel, date: e.target.value })}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              취소
            </Button>
            <Button variant="primary" onClick={handleNewTravelSubmit}>
              저장
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  )

}

export default History;
