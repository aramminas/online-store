import { FilterActions } from "../actions/filter-actions";

export const filterInitState = {
  search: "",
  category: "",
  brand: "",
  rating: "",
  minPrice: 0,
  maxPrice: 0,
  sortByPrice: false,
  sortByRating: false,
};

export const filterReducer = (state, action) => {
  switch (action.type) {
    case FilterActions.Search:
    case FilterActions.Category:
    case FilterActions.Brand:
    case FilterActions.Rating:
    case FilterActions.MinPrice:
    case FilterActions.MaxPrice:
    case FilterActions.SortByPrice:
    case FilterActions.SortByRating: {
      return {
        ...state,
        [action.type]: action.payload,
      };
    }
    case FilterActions.ResetState: {
      return filterInitState;
    }
  }

  return state;
};
