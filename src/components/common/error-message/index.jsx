import { Alert } from "react-bootstrap";

export const ErrorMessage = ({ children }) => {
  return (
    <Alert variant="danger">
      <Alert.Heading>Error!</Alert.Heading>
      <p>{children}</p>
    </Alert>
  );
};
