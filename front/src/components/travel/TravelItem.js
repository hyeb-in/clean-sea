import React, { useState } from 'react';
import { Row, FormControl, Button } from "react-bootstrap";
import * as Api from "../../Api";

const TravelItem = ({ travelData, onTravelUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTravel, setEditedTravel] = useState({
    beachId: travelData.beachId,
    date: travelData.date
  });

  // Travel 항목을 업데이트 하는 함수
  const handleUpdateTravel = async () => {
    try {
      await Api.put(`travels/${travelData._id}`, editedTravel);
      onTravelUpdate(travelData._id, editedTravel);  // 부모 컴포넌트로 업데이트 된 내용을 보냄
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating the travel item:', error);
    }
  };

  return (
    <Row>
      <h5>
        {isEditing
          ? <FormControl type="text" value={editedTravel.beachId} onChange={e => setEditedTravel({ ...editedTravel, beachId: e.target.value })} />
          : travelData.beachId
        }
      </h5>
      <p>
        {isEditing
          ? <FormControl type="text" value={editedTravel.date} onChange={e => setEditedTravel({ ...editedTravel, date: new Date(e.target.value) })} />
          : travelData.date
        }
      </p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
        {isEditing ? (
          <>
            <Button variant="link" onClick={() => setIsEditing(false)}>취소</Button>
            <Button variant="link" onClick={handleUpdateTravel}>업데이트</Button>
          </>
        ) : (
          <Button variant="link" onClick={() => setIsEditing(true)}>편집</Button>
        )}
      </div>
    </Row>
  );
};

export default TravelItem;
