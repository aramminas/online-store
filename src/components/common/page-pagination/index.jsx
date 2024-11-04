import { useEffect, useState } from "react";
import { Col, Pagination, Row } from "react-bootstrap";

export const PagePagination = ({ page, limit, total, setPage }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getPageItems(page, total));
  }, [page, total]);

  const getPageItems = (active, total) => {
    let itemsEl = [];
    const pages = Math.ceil(total / limit);

    for (let number = 1; number <= pages; number++) {
      itemsEl.push(
        <Pagination.Item
          key={number}
          active={number === active}
          onClick={() => {
            window.scrollTo(0, 0);
            setPage(number);
          }}
        >
          {number}
        </Pagination.Item>
      );
    }

    return itemsEl;
  };

  return (
    <Row className="my-5">
      <Col className="d-flex justify-content-center">
        <Pagination>{items}</Pagination>
      </Col>
    </Row>
  );
};
