import { useReducer, useState, useRef } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

import {
  filterReducer,
  filterInitState,
} from "../../store/reducers/filter-reducer";
import { setDispatch } from "../../utils";
import { NotFound } from "../../components/common/no-found";
import { useProductsInfo } from "../../hooks/useProductsInfo";
import { MainTitle } from "../../components/common/main-title";
import { FilterActions } from "../../store/actions/filter-actions";
import { useProductsByFilters } from "../../hooks/useProductsByFilters";
import { FilterPanel } from "../../components/pages/products/filter-panel";
import { AllProducts } from "../../components/pages/products/all-products";
import { DataStateWrapper } from "../../components/common/data-state-wrapper";

export const Products = () => {
  const formRef = useRef(null);
  const [limit] = useState(10);
  const [page, setPage] = useState(1);
  const [isVisible, toggleVisibility] = useState(false);
  const [filterState, dispatch] = useReducer(filterReducer, filterInitState);
  const setFilterDispatch = setDispatch(dispatch);

  const { data, total, error, loading } = useProductsByFilters(
    filterState,
    page,
    limit
  );

  const { data: filterInfo } = useProductsInfo();

  const resetFilters = () => {
    setPage(1);
    setFilterDispatch(FilterActions.ResetState);
    formRef?.current?.reset();
  };

  return (
    <Container>
      <Row>
        <Col>
          <MainTitle>All products</MainTitle>
        </Col>
      </Row>
      {isVisible ? (
        <FilterPanel
          formRef={formRef}
          setPage={setPage}
          filterInfo={filterInfo}
          filterState={filterState}
          resetFilters={resetFilters}
          dispatch={setFilterDispatch}
          toggleVisibility={toggleVisibility}
        />
      ) : (
        <Button
          data-testid="show-filters-btn"
          variant="outline-secondary"
          onClick={() => toggleVisibility(true)}
        >
          Show filters
        </Button>
      )}
      {loading || error ? (
        <Row className="mb-5 mt-2">
          <Col>
            <DataStateWrapper loading={loading} error={error} />
          </Col>
        </Row>
      ) : data?.length ? (
        <AllProducts
          products={data}
          page={page}
          limit={limit}
          total={total}
          setPage={setPage}
        />
      ) : (
        <Row className="mb-5 mt-4">
          <Col>
            <NotFound resetFilters={resetFilters} />
          </Col>
        </Row>
      )}
    </Container>
  );
};
