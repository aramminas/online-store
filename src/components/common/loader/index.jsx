import { Alert, Spinner } from "react-bootstrap";

export const Loader = () => {
  return (
    <Alert variant="light">
      <Alert.Heading className="text-center">
        <Spinner animation="border" role="status" />
        <span className="ms-3">Loading...</span>
      </Alert.Heading>
    </Alert>
  );
};
