import { Col, Container, Row, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Footer = () => {
  const fullYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-secondary h-25 py-5">
      <Container>
        <Row>
          <Col className="col-12 col-md-6">
            <p className="text-start text-md-end mb-0">
              © {fullYear} Copyright:
            </p>
          </Col>
          <Col className="col-12 col-md-6">
            <Nav.Link as={Link} to="/">
              Online Store
            </Nav.Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
