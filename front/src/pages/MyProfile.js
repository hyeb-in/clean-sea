import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  FormControl
} from "react-bootstrap";
import { useParams } from 'react-router-dom';
import History from "../components/History";
import CardHeader from "react-bootstrap/CardHeader";
import * as Api from "../Api";

const MyProfile = () => {
  const { id } = useParams();

  const [userName, setUserName] = useState("훈제오리");
  const [userEmail, setUserEmail] = useState("elice@elice.com");
  const [userDescription, setUserDescription] = useState("설명이 아직 없습니다. 추가해주세요");
  const [userProfileImage, setUserProfileImage] = useState("https://blog.getbootstrap.com/assets/brand/bootstrap-logo-shadow@2x.png");
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await Api.get(`users/${id}`);
        const userData = response.data;

        setUserName(userData.name);
        setUserEmail(userData.email);
        setUserDescription(userData.description);
        setUserProfileImage(userData.profileImage || "https://blog.getbootstrap.com/assets/brand/bootstrap-logo-shadow@2x.png");
      } catch (error) {
        alert('유저 정보를 가져오는 데 실패했습니다.');
      }
    };

    fetchUserData();
  }, [id]);

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  const handleCompleteClick = async () => {
    setIsEditMode(false);

    const apiEndpoint = `users/${id}`;
    const postData = {
      name: userName,
      email: userEmail,
      description: userDescription
    };
    try {
      await Api.put(apiEndpoint, postData);
      alert('정보가 성공적으로 업데이트되었습니다.');
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card small className="mb-4 pt-3">
            <CardHeader className="border-bottom">
              <div className="mb-3 mx-auto">
                <img
                  className="rounded-circle"
                  src={userProfileImage}
                  width="110"
                  alt="User Profile"
                />
              </div>
              {isEditMode ? <FormControl type="text" value={userName} onChange={e => setUserName(e.target.value)} /> : <h4 className="mb-2">{userName}</h4>}
              {isEditMode ? <FormControl type="text" value={userEmail} onChange={e => setUserEmail(e.target.value)} /> : <span className="text-muted d-block mb-1">{userEmail}</span>}
            </CardHeader>
            <ListGroup flush>
              <ListGroupItem className="p-4">
                {isEditMode ? <FormControl type="text" value={userDescription} onChange={e => setUserDescription(e.target.value)} /> : <strong className="text-muted d-block mb-2">{userDescription}</strong>}
              </ListGroupItem>
            </ListGroup>

            <span>
              <Button variant="link" onClick={handleEditClick}>{isEditMode ? '취소' : '편집'}</Button>
              {isEditMode && <Button variant="link" onClick={handleCompleteClick}>완료</Button>}
            </span>
          </Card>
        </Col>
      </Row>
      <Row>
        <History></History>
      </Row>
    </Container>
  );
}

export default MyProfile;
