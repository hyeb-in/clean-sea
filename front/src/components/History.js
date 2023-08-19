import React, { useState, useEffect, useContext  } from 'react'
import { Col, Container, Row, Card, Button, Modal, FormControl } from "react-bootstrap";
import * as Api from "../Api";
import { UserStateContext } from "../App";

const History = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [travels, setTravels] = useState([]);
  const [editedTravel, setEditedTravel] = useState(null);
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
      setTravels(response);
    } catch (error) {
      console.error('방문 로그 조회 실패:', error);
    }
  };
  const handleNewTravelSubmit = async () => {
    try {
      const travelData = { ...newTravel, date: new Date(newTravel.date) };
      await Api.post('travels/register', { data: travelData });
    } catch (error) {
      console.error('새로운 여행 정보 등록 실패:', error);
    }

    await fetchTravelList();
    handleModalClose();
  };

  useEffect(() => {
    fetchTravelList();
  }, []);

  const handleUpdateLogClick = async () => {
    if (!editedTravel) return;

    try {
      await Api.put(`travels/update/${editedTravel._id}`, editedTravel);
      const updatedTravels = travels.map(travel => travel._id === editedTravel._id ? editedTravel : travel);
      setTravels(updatedTravels);
      setIsEditMode(false);
      setEditedTravel(null);
    } catch (error) {
      console.error('Error updating the log:', error);
    }
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
                    <Row key={index}>
                      <h5>
                        {isEditMode
                          ? <FormControl type="text" defaultValue={travel.beachId} onChange={e => setEditedTravel({ ...editedTravel, beachId: e.target.value })} />
                          : travel.beachId
                        }
                      </h5>
                      <p>
                        {isEditMode
                          ? <FormControl type="text" defaultValue={travel.date} onChange={e => setEditedTravel({ ...editedTravel, date: new Date(e.target.value) })} />
                          : travel.date
                        }
                      </p>
                    </Row>
                  ))
                ) : (
                  <p className="m-2">방문 로그가 없습니다</p>
                )}
              </Col>
            </Row>
            {travels.length > 0 &&
              <Row className="align-items-start">
                <Button variant="link" onClick={() => setIsEditMode(!isEditMode)}>
                  {isEditMode ? '취소' : '편집'}
                </Button>
                {isEditMode && <Button variant="link" onClick={handleUpdateLogClick}>업데이트</Button>}
              </Row>
            }
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
