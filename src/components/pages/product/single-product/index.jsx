import { Link } from "react-router-dom";
import { Badge, Button, Card, Col } from "react-bootstrap";
import { ProductRating } from "../../../common/product-rating";

export const SingleProduct = ({ data }) => {
  if (!data) {
    return null;
  }

  return (
    <Col className="single-product-card-col">
      <Card className="single-product-content my-5">
        <Card.Img
          variant="top"
          className="single-product-img"
          src={data.imageUrl}
          alt={data.name}
        />
        <Card.Body>
          <Card.Title>{data.name}</Card.Title>
          <Card.Text>{data.description}</Card.Text>
          <Card.Text>
            <Badge bg="success">{data.brand}</Badge>
          </Card.Text>
          <Card.Text>${data.price}</Card.Text>
          <ProductRating value={data.rating} />
        </Card.Body>
        <Card.Footer variant="primary" className="single-product-footer">
          <Card.Text>
            <Badge bg="secondary">{data.category}</Badge>
          </Card.Text>
          <div className="d-grid gap-2">
            <Button as={Link} to="/products" variant="outline-secondary">
              Back to all products
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </Col>
  );
};
