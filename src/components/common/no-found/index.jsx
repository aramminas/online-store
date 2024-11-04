import { Button, Alert, Image, Col, Row } from "react-bootstrap";

import emptyState from "../../../assets/images/empty_state.png";

export const NotFound = ({ resetFilters }) => {
  return (
    <Alert variant="success">
      <Alert.Heading>Not result found!</Alert.Heading>
      <Row>
        <Col className="d-flex flex-column align-items-center justify-content-center">
          <Image src={emptyState} roundedCircle width={200} />
          <p>It seems we can't find any result based on your search.</p>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col className="d-flex justify-content-end">
          <Button onClick={() => resetFilters()} variant="outline-success">
            Reset filter settings
          </Button>
        </Col>
      </Row>
    </Alert>
  );
};
