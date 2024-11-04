import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
  CloseButton,
} from "react-bootstrap";
import { RatingEl } from "../../../common/product-rating";
import { ResetIcon } from "../../../../assets/icon/reset-icon";
import { SearchIcon } from "../../../../assets/icon/search-icon";
import { FilterActions } from "../../../../store/actions/filter-actions";

export const FilterPanel = ({
  formRef,
  setPage,
  filterInfo,
  filterState,
  dispatch,
  toggleVisibility,
  resetFilters,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [debounceValue] = useDebounce(searchValue, 600);

  useEffect(() => {
    handleDispatch(FilterActions.Search, debounceValue);
  }, [debounceValue]);

  useEffect(() => {
    if (filterState.search === "") {
      setSearchValue("");
    }
  }, [filterState.search]);

  const handleDispatch = (action, value) => {
    setPage(1);
    dispatch(action, value);
  };

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between">
        <span className="h5 mb-0">Filter panel</span>
        <CloseButton
          onClick={() => toggleVisibility(false)}
          data-testid="filter-close-btn"
        />
      </Card.Header>
      <Card.Body>
        <Form ref={formRef}>
          <Row>
            <Col xs={12} md={10}>
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <SearchIcon />
                </InputGroup.Text>
                <Form.Control
                  data-testid="search-input"
                  name="search"
                  placeholder="Search by name ..."
                  aria-label="search"
                  aria-describedby="search"
                  value={searchValue}
                  onChange={(ev) => setSearchValue(ev.target.value)}
                />
                <Button variant="outline-secondary" onClick={resetFilters}>
                  <ResetIcon />
                  <span className="d-none d-md-inline">Reset filters</span>
                </Button>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6} lg={5}>
              <Form.Group className="mb-3" controlId="Category">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  data-testid="category-select"
                  aria-label="Category"
                  onChange={(ev) =>
                    handleDispatch(FilterActions.Category, ev.target.value)
                  }
                >
                  <option value="">Select category</option>
                  {filterInfo.categories.map((category) => (
                    <option
                      key={category}
                      value={category}
                      data-testid={`category-option-${category}`}
                    >
                      {category}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={6} lg={5}>
              <Form.Group className="mb-3" controlId="brand">
                <Form.Label>Brand</Form.Label>
                <Form.Select
                  data-testid="brand-select"
                  aria-label="brand"
                  onChange={(ev) =>
                    handleDispatch(FilterActions.Brand, ev.target.value)
                  }
                >
                  <option value="">Select brand</option>
                  {filterInfo.brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6} lg={5}>
              <Form.Group className="mb-3" controlId="price">
                <Form.Label>Price (min/max)</Form.Label>
                <Row>
                  <Col xs={9} md={8} lg={10}>
                    <Form.Range
                      data-testid="min-price-range"
                      value={filterState.minPrice}
                      onChange={(e) =>
                        handleDispatch(FilterActions.MinPrice, +e.target.value)
                      }
                      max={Math.ceil(filterInfo.maxPrice)}
                    />
                  </Col>
                  <Col xs={3} md={4} lg={2}>
                    {filterState.minPrice ? `$ ${filterState.minPrice}` : ""}
                  </Col>
                </Row>
                <Row>
                  <Col xs={9} md={8} lg={10}>
                    <Form.Range
                      data-testid="max-price-range"
                      value={filterState.maxPrice}
                      onChange={(e) =>
                        handleDispatch(FilterActions.MaxPrice, +e.target.value)
                      }
                      max={Math.ceil(filterInfo.maxPrice)}
                    />
                  </Col>
                  <Col xs={3} md={4} lg={2}>
                    {filterState.maxPrice ? `$ ${filterState.maxPrice}` : ""}
                  </Col>
                </Row>
              </Form.Group>
            </Col>
            <Col xs={12} md={6} lg={5}>
              <Form.Group className="mb-3" controlId="filter-rating">
                <Form.Label>Rating</Form.Label>
                <RatingEl
                  value={filterState.rating}
                  setValue={(value) =>
                    handleDispatch(FilterActions.Rating, value)
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex gap-3">
              <Form.Check
                type="checkbox"
                id="sort-by-price"
                label="Sort by price"
                onChange={(ev) =>
                  handleDispatch(FilterActions.SortByPrice, ev.target.checked)
                }
              />
              <Form.Check
                type="checkbox"
                id="sort-by-rating"
                label="Sort by rating"
                onChange={(ev) =>
                  handleDispatch(FilterActions.SortByRating, ev.target.checked)
                }
              />
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};
