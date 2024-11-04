import "@testing-library/jest-dom";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { Products } from "../pages/products/index";

beforeEach(() => {
  Object.defineProperty(SVGElement.prototype, "getBBox", {
    value: jest.fn(() => ({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    })),
  });
});

afterEach(cleanup);

test("Checking the display of a UI element on the Products page", () => {
  render(<Products />);

  // check if main title exists
  const titleElement = screen.getByText(/All products/i);
  expect(titleElement).toBeInTheDocument();

  // check if the filter button exists
  const buttonElement = screen.getByText(/Show filters/i);
  expect(buttonElement).toBeInTheDocument();

  // open filter panel
  const filterBtn = screen.getByTestId("show-filters-btn");
  fireEvent.click(filterBtn);

  // check if the filter button exists
  const filterPanelElement = screen.getByText(/Filter panel/i);
  expect(filterPanelElement).toBeInTheDocument();

  // check filter elements are exists
  const searchInput = screen.queryByTestId("search-input");
  expect(searchInput).toBeInTheDocument();

  const categorySelect = screen.queryByTestId("category-select");
  expect(categorySelect).toBeInTheDocument();

  const brandSelect = screen.queryByTestId("brand-select");
  expect(brandSelect).toBeInTheDocument();

  const minPriceRange = screen.queryByTestId("min-price-range");
  expect(minPriceRange).toBeInTheDocument();

  const maxPriceRange = screen.queryByTestId("max-price-range");
  expect(maxPriceRange).toBeInTheDocument();
});
