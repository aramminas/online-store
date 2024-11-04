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

  test("check the product filtering category functionality", async () => {
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

      // open category select list
      const categorySelectElement = getByTestId("category-select");
      // Change the value to one of the options
      fireEvent.change(categorySelectElement, {
        target: { value: "Electronics" },
      });

      // after selecting the Electronics category,
      // the total number of products on the screen should be equal to 3
      const productsCardElectronics = await findAllByTestId(
        "product-card-item"
      );
      expect(productsCardElectronics).toHaveLength(3);

      // elements that must be present
      expect(productsCardElectronics[0]).toHaveTextContent(
        "Wireless Headphones"
      );
      expect(productsCardElectronics[1]).toHaveTextContent("Bluetooth Speaker");
      expect(productsCardElectronics[2]).toHaveTextContent("Smartphone");

      // elements that should not be present on screen
      const elementOneNot = queryByText(/Leather Jacket/i);
      expect(elementOneNot).not.toBeInTheDocument();
      const elementTwoNot = queryByText(/Running Shoes/i);
      expect(elementTwoNot).not.toBeInTheDocument();
    });
  });
});
