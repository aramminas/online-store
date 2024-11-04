import "@testing-library/jest-dom";

import React from "react";
import { MemoryRouter } from "react-router-dom";

import { act, render, waitFor } from "@testing-library/react";
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

describe("check that the list of products is displayed correctly after the request", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("check the product list ui", async () => {
    const { getByText, getAllByText } = await act(async () =>
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
      // check if the first product is displayed correctly
      //   name
      const productNameElement = getByText("Wireless Headphones");
      expect(productNameElement).toBeInTheDocument();
      //   category
      const productCategoryElement = getAllByText("Electronics");
      expect(productCategoryElement[0]).toBeInTheDocument();
      //   price
      const productPriceElement = getAllByText(/99.99/i);
      expect(productPriceElement[0]).toBeInTheDocument();
      //   brand
      const productBrandElement = getByText("Brand A");
      expect(productBrandElement).toBeInTheDocument();
      //   rating
      const productRatingElement = getByText("(2.5)");
      expect(productRatingElement).toBeInTheDocument();

      // check third product as well
      //   name
      const thirdProductNameElement = getByText("Running Shoes");
      expect(thirdProductNameElement).toBeInTheDocument();
      //   brand
      const thirdProductBrandElement = getByText("Brand C");
      expect(thirdProductBrandElement).toBeInTheDocument();
    });
  });
});
