import { Col, Container, Row } from "shards-react";

import LoginFooter from "../components/layout/LoginFooter";
import PropTypes from "prop-types";
import React from "react";

const LoginLayout = ({ children, noFooter }) => (
  <Container fluid>
    <Row>
      <Col
        className="main-content p-0"
        sm="12"
        tag="main"
      >
        {children}
        {!noFooter && <LoginFooter />}
      </Col>
    </Row>
  </Container>
);

LoginLayout.propTypes = {
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

LoginLayout.defaultProps = {
  noFooter: false
};

export default LoginLayout;
