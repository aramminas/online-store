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

  test("check the product filtering search functionality", async () => {
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

      const secondProductNameElement = getByText("Bluetooth Speaker");
      expect(secondProductNameElement).toBeInTheDocument();
      // all number of products on the screen 5
      const productsCard = await findAllByTestId("product-card-item");
      expect(productsCard).toHaveLength(5);

      // open filter panel
      const filterShowBtn = getByTestId("show-filters-btn");
      fireEvent.click(filterShowBtn);

      // // get search input
      const searchInput = getByTestId("search-input");
      fireEvent.change(searchInput, { target: { value: "Bluetooth" } });
      expect(searchInput.value).toBe("Bluetooth");

      // number of products on the screen
      const searchResult = await findAllByTestId("product-card-item");
      expect(searchResult).toHaveLength(1);
      // The search result should contain Bluetooth Speaker element
      expect(searchResult[0]).toHaveTextContent("Bluetooth Speaker");

      // elements that should not be present on screen
      const elementOneNot = queryByText(/Leather Jacket/i);
      expect(elementOneNot).not.toBeInTheDocument();

      // look for another product Smartphone
      fireEvent.change(searchInput, { target: { value: "Smartphone" } });
      expect(searchInput.value).toBe("Smartphone");

      // elements that should not be present on screen
      const elementTwoNot = queryByText(/Bluetooth Speaker/i);
      expect(elementTwoNot).not.toBeInTheDocument();

      // search for incomplete words
      fireEvent.change(searchInput, { target: { value: "on" } });
      expect(searchInput.value).toBe("on");

      // number of products on the screen
      const searchByLettersResult = await findAllByTestId("product-card-item");
      expect(searchByLettersResult).toHaveLength(2);

      // elements that should be present on screen
      expect(searchByLettersResult[0]).toHaveTextContent("Wireless Headphones");
      expect(searchByLettersResult[1]).toHaveTextContent("Smartphone");

      // search for a non-existent product
      fireEvent.change(searchInput, { target: { value: "T-shirt" } });
      expect(searchInput.value).toBe("T-shirt");

      // message that nothing was found
      const notResultFoundElement = queryByText("Not result found!");
      expect(notResultFoundElement).toBeInTheDocument();
    });
  });
});
