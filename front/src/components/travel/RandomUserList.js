import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/CardHeader';

const RandomUserList = ({ data }) => {
  return (
    <>
      {data.map(user => (
        <Card key={user._id} className="mb-4 mt-4 pt-3">
          <CardHeader className="border-bottom">
            <h4 className="mb-2">{user.name}</h4>
            <span className="text-muted d-block mb-1">{user.email}</span>
          </CardHeader>
          <ListGroup flush>
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
