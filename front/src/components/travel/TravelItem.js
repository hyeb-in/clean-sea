import React, { useState } from 'react';
import { FormControl, Button, Modal, Card, Col } from "react-bootstrap";
import * as Api from "../../Api";

const TravelItem = ({ travelData, onTravelUpdate, onTravelDelete, displayToast, travelImage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [travelId, setTravelId] = useState({
    _id: travelData._id
  });

  const [editedTravel, setEditedTravel] = useState({
    beachId: travelData.beachId,
    date: travelData.date
  });

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleUpdateTravel = async () => {
    try {
      await Api.put(`travels/${travelId._id}`, editedTravel);
      onTravelUpdate(travelData._id, editedTravel);
      setIsEditing(false);
      displayToast('방문 로그가 성공적으로 업데이트 되었습니다.');
    } catch (error) {
      displayToast('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleDeleteClick = async () => {
    try {
      await Api.delete(`travels/${travelId._id}`);
      onTravelDelete();
      displayToast('방문 로그가 성공적으로 삭제되었습니다.');
    } catch (error) {
      displayToast('오류가 발생했습니다. 다시 시도해주세요.');
    }
    handleCloseDeleteModal();
  };

  // 기본 이미지
  const defaultImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";

  return (
    <>
      <div className="row g-0">
        {!isEditing && (
          <Card style={{ width: '100%', marginBottom: '15px' }}>
            <Col md={2}>
              <Card.Img src={travelImage || defaultImage} alt="travelImage" />
            </Col>
            <Col md={8}>
              <Card.Body>
                <Card.Title>{travelData.beachId}</Card.Title>
                <Card.Text>{travelData.date}</Card.Text>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                  <Button variant="link" onClick={() => setIsEditing(true)}>편집</Button>
                  <Button variant="link" onClick={handleShowDeleteModal}>삭제</Button>
                </div>
              </Card.Body>
            </Col>
          </Card>
        )}

        {isEditing && (
          <>
            <h5>
              <FormControl type="text" value={editedTravel.beachId} onChange={e => setEditedTravel({ ...editedTravel, beachId: e.target.value })} />
            </h5>
            <p>
              <FormControl type="text" value={editedTravel.date} onChange={e => setEditedTravel({ ...editedTravel, date: new Date(e.target.value) })} />
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
              <Button variant="link" onClick={() => setIsEditing(false)}>취소</Button>
              <Button variant="link" onClick={handleUpdateTravel}>업데이트</Button>
            </div>
          </>
        )}

        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>삭제 확인</Modal.Title>
          </Modal.Header>
          <Modal.Body>정말 삭제하시겠습니까?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteModal}>취소</Button>
            <Button variant="danger" onClick={handleDeleteClick}>삭제</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default TravelItem;
