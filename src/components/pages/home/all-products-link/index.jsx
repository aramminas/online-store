import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

export const AllProductsLink = () => {
  return (
    <h3 className="px-5 px-sm-0">
      <Nav.Link as={Link} to="/products">
        View all products
      </Nav.Link>
    </h3>
  );
};
