import { useParams } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";

import { useProduct } from "../../hooks/useProduct";
import { MainTitle } from "../../components/common/main-title";
import { SingleProduct } from "../../components/pages/product/single-product";
import { DataStateWrapper } from "../../components/common/data-state-wrapper";
import "./styles.scss";

export const Product = () => {
  const { id } = useParams();
  const { data, error, loading } = useProduct(id);

  if (loading || error || !data) {
    return (
      <Container className="mt-5">
        <DataStateWrapper loading={loading || !data} error={error} />
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        <Col>
          <MainTitle>{data.name}</MainTitle>
        </Col>
      </Row>
      <Row>
        <Col className="single-product-card-col">
          <SingleProduct data={data} />
        </Col>
      </Row>
    </Container>
  );
};
