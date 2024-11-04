import { Container } from "react-bootstrap";
import { MainTitle } from "../../components/common/main-title";
import { TopProducts } from "../../components/pages/home/top-products";
import { AllProductsLink } from "../../components/pages/home/all-products-link";

export const Home = () => {
  return (
    <Container>
      <MainTitle>Our Top Products</MainTitle>
      <AllProductsLink />
      <TopProducts />
    </Container>
  );
};
