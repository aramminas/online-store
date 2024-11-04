import { Rating, Star } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const myStyles = {
  itemShapes: Star,
  activeFillColor: "#ffb700",
  inactiveFillColor: "#fbf1a9",
};

export const ProductRating = ({ value }) => {
  return (
    <div className="d-flex">
      <Rating
        readOnly
        value={value}
        itemStyles={myStyles}
        style={{ height: 25, maxWidth: 100 }}
      />
      <span className="px-2">({value})</span>
    </div>
  );
};

export const RatingEl = ({ value, setValue }) => {
  return (
    <Rating
      value={value}
      onChange={setValue}
      itemStyles={myStyles}
      style={{ height: 25, maxWidth: 100 }}
    />
  );
};
