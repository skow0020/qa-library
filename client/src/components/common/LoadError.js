import { Container } from "shards-react";
import React from "react";

const Error = (error) => (
  <Container fluid className="main-content-container px-4 pb-4">
    <div className="error">
      <div className="error__content">
        <h3>Something went wrong!</h3>
        <p>{error.error}</p>
      </div>
    </div>
  </Container>
);

export default Error;
