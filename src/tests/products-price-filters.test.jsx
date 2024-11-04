import "@testing-library/jest-dom";

import React from "react";
import { MemoryRouter } from "react-router-dom";

import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { Products } from "../pages/products/index";
import { productsData } from "./mock-data";

// mock product images
jest.mock("/images/default.jpg", () => "/images/default.jpg");

// mock svg icons
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

jest.mock("use-debounce", () => ({
  useDebounce: (value) => [value], // Return value immediately
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ products: productsData }),
  })
);

global.structuredClone = (val) => {
  return JSON.parse(JSON.stringify(val));
};

describe("Products page", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("check the product filtering price functionality", async () => {
    const { getByTestId, getByText, findAllByTestId, queryByText } = await act(
      async () =>
        render(
          <MemoryRouter>
            <Products />
          </MemoryRouter>
        )
    );

    // we use the delay function to simulate the request to the server
    // (this is necessary to mock the setTimeout function).
    jest.runAllTimers();

    await waitFor(async () => {
      // these elements must be present during the first rendering
      const productNameElement = getByText("Wireless Headphones");
      expect(productNameElement).toBeInTheDocument();

      // all number of products on the screen 5
      const productsCard = await findAllByTestId("product-card-item");
      expect(productsCard).toHaveLength(5);

      // open filter panel
      const filterShowBtn = getByTestId("show-filters-btn");
      fireEvent.click(filterShowBtn);

      // get min price range input
      const minPriceRange = getByTestId("min-price-range");
      fireEvent.change(minPriceRange, { target: { value: "400" } });
      expect(minPriceRange.value).toBe("400");

      // number of products on the screen
      const minPriceRangeResult = await findAllByTestId("product-card-item");
      expect(minPriceRangeResult).toHaveLength(1);
      // The search result should contain Smartphone element
      expect(minPriceRangeResult[0]).toHaveTextContent("Smartphone");

      // get max price range input
      const maxPriceRange = getByTestId("max-price-range");

      // price from 50 to 150
      fireEvent.change(minPriceRange, { target: { value: "50" } });
      expect(minPriceRange.value).toBe("50");
      fireEvent.change(maxPriceRange, { target: { value: "150" } });
      expect(maxPriceRange.value).toBe("150");

      // number of products on the screen
      const maxPriceRangeResult = await findAllByTestId("product-card-item");

      expect(maxPriceRangeResult).toHaveLength(2);
      // The search result should contain 2 elements
      expect(maxPriceRangeResult[0]).toHaveTextContent("Wireless Headphones");
      expect(maxPriceRangeResult[1]).toHaveTextContent("Running Shoes");
    });
  });
});
