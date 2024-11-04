import { Card, CardGroup, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

import { ProductRating } from "../../../common/product-rating";
import { DataStateWrapper } from "../../../common/data-state-wrapper";
import { useTopProducts } from "../../../../hooks/useTopProducts";

export const TopProducts = () => {
  const { data, error, loading } = useTopProducts();

  if (loading || error || !data) {
    return <DataStateWrapper loading={loading || !data} error={error} />;
  }

  return (
    <CardGroup className="mb-5 px-5 px-sm-0">
      {data.map((product) => (
        <Card key={product.id}>
          <Card.Img
            variant="top"
            className="p-1"
            src={product.imageUrl}
            alt={product.name}
          />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>
              <Badge bg="success">{product.brand}</Badge>
            </Card.Text>
            <Card.Text>${product.price}</Card.Text>
            <ProductRating value={product.rating} />
          </Card.Body>
          <Card.Footer variant="primary">
            <Card.Text>
              <Badge bg="secondary">{product.category}</Badge>
            </Card.Text>
            <div className="d-grid gap-2">
              <Button
                as={Link}
                to={`/products/${product.id}`}
                variant="outline-primary"
              >
                Read More
              </Button>
            </div>
          </Card.Footer>
        </Card>
      ))}
    </CardGroup>
  );
};
