import React, { useEffect, useState } from "react";
import { FormControl, Button, Modal, Card, Col } from "react-bootstrap";
import * as Api from "../../Api";
import TravelImageWithText from "./TravelImageWithText";
import SearchInput from "./SearchInput";

const TravelItem = ({ travelData, onTravelUpdate, onTravelDelete, displayToast }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [beachName, setBeachName] = useState("");
  const [beachAddress, setBeachAddress] = useState("");
  const [travelId, setTravelId] = useState({
    _id: travelData._id
  });

  const [updatedTravel, setUpdatedTravel] = useState({
    beachId: travelData.beachId,
    date: travelData.date
  });

  useEffect(() => {
    const fetchBeachName = async () => {
      try {
        const response = await Api.get(`beaches/beachbyId/${travelData.beachId}`);
        setBeachName(response.data.name);
        setBeachAddress(response.data.address);
      } catch (error) {
        console.error('해변 이름을 가져오는데 실패했습니다.', error);
      }
    };

    fetchBeachName();
  }, [travelData.beachId]);

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleUpdateTravel = async () => {
    try {
      await Api.put(`travels/${travelId._id}`, updatedTravel);
      onTravelUpdate(travelData._id, updatedTravel);
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

  const defaultImage = process.env.PUBLIC_URL + '/stamp.png';

  return (
    <>
      <div className="row g-1">
        {!isEditing && (
          <Card style={{ width: '100%', marginBottom: '15px' }}>
            <Col md={2}>
              <TravelImageWithText text={beachAddress} imageUrl={defaultImage} />
            </Col>
            <Col md={8}>
              <Card.Body>
                <Card.Title>{beachName}</Card.Title>
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
              <SearchInput
                beachName={beachName}
                onBeachIdSelected={(id) => setUpdatedTravel({ ...updatedTravel, beachId: id })}
                displayToast={displayToast}
              />
            </h5>
            <p>
              <FormControl type="text" value={updatedTravel.date} onChange={e => setUpdatedTravel({ ...updatedTravel, date: new Date(e.target.value) })} />
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
