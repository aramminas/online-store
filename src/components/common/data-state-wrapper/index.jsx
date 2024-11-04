import { Loader } from "../loader";
import { ErrorMessage } from "../error-message";

export const DataStateWrapper = ({ loading, error }) => {
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return null;
};
