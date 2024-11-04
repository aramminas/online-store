import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <Container>
      <Row>
        <Col className="m-5">
          <Alert variant="warning">
            <Alert.Heading>404 Page Not Found Error!</Alert.Heading>
            <p>
              The page you are on does not exist, please return to the Home
              page.
            </p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button as={Link} to="/" variant="outline-warning">
                Go to home
              </Button>
            </div>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};
