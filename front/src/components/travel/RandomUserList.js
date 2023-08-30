import { Card, Image, ListGroup, ListGroupItem } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/CardHeader';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RandomUserList = ({ data }) => {
  const navigate = useNavigate();

  return (
    <>
      {data.map(user => (
        <Card key={user._id} className="mb-4 mt-4 pt-3">
          <CardHeader className="border-bottom">
            <div className="mb-3 mx-auto">
              <Image
                src={user.uploadFile && user.uploadFile.length > 0 && user.uploadFile[0] !== ""
                  ? `http://${window.location.hostname}:5001/${user.uploadFile[0]}`
                  : 'https://blog.getbootstrap.com/assets/brand/bootstrap-logo-shadow@2x.png'}
                width="110"
                alt="User Profile"
                roundedCircle
                onClick={() => navigate(`/users/${user._id}`)}
              />
            </div>
            <h4 className="mb-2">{user.name}</h4>
            <span className="text-muted d-block mb-1">{user.email}</span>
          </CardHeader>
          <ListGroup>
            <ListGroupItem className="p-4">
              <strong
                className="text-muted d-block mb-2">{user.description}</strong>
            </ListGroupItem>
          </ListGroup>
        </Card>
      ))}
    </>
  )
}

export default RandomUserList;
