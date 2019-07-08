import { Container } from "shards-react";
import React from "react";

const Loading = () => (
  <Container fluid className="main-content-container px-4 pb-4">
    <div className="error">
      <div className="error__content">
        <h3>Loading...</h3>
      </div>
    </div>
  </Container>
);

export default Loading;