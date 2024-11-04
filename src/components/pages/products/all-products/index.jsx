import { Link } from "react-router-dom";
import { Row, Col, Card, Badge, Button } from "react-bootstrap";
import { ProductRating } from "../../../common/product-rating";
import { PagePagination } from "../../../common/page-pagination";
import "./styles.scss";

export const AllProducts = ({ products, page, limit, total, setPage }) => {
  if (!products) {
    return null;
  }

  return (
    <>
      <Row
        xs={1}
        md={3}
        className="g-4 mb-5 mt-2"
        data-testid="products-data-result"
      >
        {products.map(
          ({ id, imageUrl, name, brand, rating, price, category }) => (
            <Col key={id}>
              <Card data-testid="product-card-item">
                <Card.Img
                  variant="top"
                  src={imageUrl}
                  alt={name}
                  className="product-card-image"
                />
                <Card.Body>
                  <Card.Title data-testid="product-title">{name}</Card.Title>
                  <Card.Text>
                    <Badge bg="success">{brand}</Badge>
                  </Card.Text>
                  <Card.Text>${price}</Card.Text>
                  <ProductRating value={rating} />
                </Card.Body>
                <Card.Footer
                  variant="primary"
                  className="single-product-footer"
                >
                  <Card.Text>
                    <Badge bg="secondary">{category}</Badge>
                  </Card.Text>
                  <div className="d-grid gap-2">
                    <Button
                      as={Link}
                      to={`/products/${id}`}
                      variant="outline-secondary"
                    >
                      Read More
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          )
        )}
      </Row>
      <PagePagination
        page={page}
        limit={limit}
        total={total}
        setPage={setPage}
      />
    </>
  );
};
