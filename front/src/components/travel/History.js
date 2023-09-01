import React, { useState, useEffect, useContext } from "react";
import {
  Col, Container, Row, Card, Button, Modal, FormControl
} from "react-bootstrap";
import * as Api from "../../Api";
import TravelItem from "./TravelItem";
import SearchInput from "./SearchInput";
import { useToggle } from "../../hooks/profileHooks";

const History = ({ displayToast, isEditable, id }) => {
  const [travels, setTravels] = useState([]);
  const [showModal, setShowModal] = useToggle();

  const [newTravel, setNewTravel] = useState({
    beachId: "",
    date: ""
  });

  const handleBeachIdChange = (selectedId) => {
    setNewTravel({ ...newTravel, beachId: selectedId });
  };

  const fetchTravelList = async () => {
    try {
      const response = await Api.get(`travels/users/${id}`);
      setTravels(response.data);
    } catch (error) {
      displayToast("방문 로그 조회 실패.");
    }
  };

  const handleNewTravelSubmit = async () => {
    try {
      const travelData = { ...newTravel, date: new Date(newTravel.date) };
      await Api.post("travels/register", travelData);
      displayToast("방문 로그 등록 성공.");
    } catch (error) {
      displayToast("방문 로그 등록 실패.");
    }

    await fetchTravelList();
    setShowModal();
  };

  useEffect(() => {
    fetchTravelList();
  }, [id]);

  const handleTravelUpdate = (travelId, updatedTravel) => {
    const updatedTravels = travels.map(
      travel => travel._id === travelId ? updatedTravel : travel);
    setTravels(updatedTravels);
  };

  return (
    <>
      <Container className="px-0">
        <Card className="mb-4 mt-4 pt-3">
          <Card.Body>
            <Row className="mt-4">
              <Col>
                <h3 className="mb-3">방문 로그</h3>
              </Col>
              <Col xs={6} className="d-flex justify-content-end">
                {
                  isEditable ? (
                    <Button
                      size="sm" style={{ marginTop: "5px", marginBottom: "5px" }}
                      onClick={setShowModal}
                    >
                      로그 작성
                    </Button>
                  ) : <></>
                }

              </Col>
              <Col xs={1}>
                {/*여백용 빈 컬럼*/}
              </Col>
            </Row>
            <Row>
              <Col>
                {travels.length > 0 ? (
                  travels.map((travel, index) => (
                    <TravelItem key={index} travelData={travel}
                                onTravelUpdate={handleTravelUpdate}
                                onTravelDelete={fetchTravelList}
                                displayToast={displayToast}
                                isEditable={isEditable}/>
                  ))
                ) : (
                  <p className="m-2">방문 로그가 없습니다</p>
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Modal show={showModal} onHide={setShowModal}>
          <Modal.Header closeButton>
            <Modal.Title>새 방문 로그 작성</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SearchInput onBeachIdSelected={handleBeachIdChange}
                         displayToast={displayToast}/>
            <FormControl
              type="date"
              className="mt-2"
              value={newTravel.date}
              onChange={(e) => setNewTravel(
                { ...newTravel, date: e.target.value })}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={setShowModal}>
              취소
            </Button>
            <Button variant="primary" onClick={handleNewTravelSubmit}>
              저장
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default History;
