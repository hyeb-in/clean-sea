import React, { useState, useEffect } from 'react'
import {
  Col,
  Container,
  Row,
  Button,
  FormControl,
  Card
} from "react-bootstrap";
import * as Api from "../Api";

const History = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [travels, setTravels] = useState([]);
  const [editedTravel, setEditedTravel] = useState(null);

  useEffect(() => {
    const fetchTravelList = async () => {
      try {
        const response = await Api.get({ endpoint: 'travels/travelList' });
        setTravels(response);
      } catch (error) {
        console.error('방문 로그 조회 실패:', error);
      }
    };

    fetchTravelList();
  }, []);

  const handleUpdateLogClick = async () => {
    if (!editedTravel) return;

    try {
      await Api.put({ endpoint: `travels/update/${editedTravel._id}`, data: editedTravel });
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
                  <p className="mb-4">방문 로그가 없습니다</p>
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
      </Container>
    </>
  )

}

export default History;
