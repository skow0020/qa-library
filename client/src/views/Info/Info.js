import { Container } from "shards-react";
import React from "react";

class Info extends React.Component {
  state = {
    backgroundImage: require("../../images/code1.jpg")
  };
  render() {
    const { backgroundImage } = this.state;

    return (
      <Container>
        <div id="info-container">
          <img className="d-block w-100" src={`${backgroundImage}`} alt="welcome" />
          <div className="carousel-caption d-none d-md-block">
            <h3 className="text-white">This site is a hub of resources for learning programming languages, tools, testing, and best practices across the industry</h3>
            <p>For more information, google it</p>
          </div>
        </div>
      </Container>
    );
  }
}
export default Info;
