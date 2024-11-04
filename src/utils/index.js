export const delay = (ms = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const setDispatch = (dispatch) => (type, payload) =>
  dispatch({ type, payload });

const showOnCurrentPage = (data, page, limit) => {
  const startIndex = page * limit - limit;
  const endIndex = startIndex + limit;

  return { data: data.slice(startIndex, endIndex), total: data.length };
};

export const filterProductData = (data, filters, page, limit) => {
  const {
    search,
    category,
    brand,
    rating,
    minPrice,
    maxPrice,
    sortByPrice,
    sortByRating,
  } = filters;

  let filteredData = structuredClone(data);

  // check that no filters are selected
  if (Object.values(filters).every((v) => !v)) {
    return showOnCurrentPage(filteredData, page, limit);
  }

  if (search !== "") {
    const regex = new RegExp(search, "i");
    filteredData = filteredData.filter((product) => regex.test(product.name));
  }

  if (category) {
    filteredData = filteredData.filter(
      (product) => product.category === category
    );
  }

  if (brand) {
    filteredData = filteredData.filter((product) => product.brand === brand);
  }

  if (rating) {
    filteredData = filteredData.filter((product) => product.rating >= rating);
  }

  if (minPrice) {
    filteredData = filteredData.filter((product) => product.price >= minPrice);
  }

  if (maxPrice) {
    filteredData = filteredData.filter((product) => product.price <= maxPrice);
  }

  if (sortByPrice) {
    filteredData = filteredData.sort(({ price: aPrice }, { price: bPrice }) => {
      return aPrice - bPrice;
    });
  }

  if (sortByRating) {
    filteredData = filteredData.sort(
      ({ rating: aRating }, { rating: bRating }) => {
        return aRating - bRating;
      }
    );
  }

  return showOnCurrentPage(filteredData, page, limit);
};
