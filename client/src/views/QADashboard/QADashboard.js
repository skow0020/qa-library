import { Container } from "shards-react";
import React from "react";
import { Store } from "../../flux";
import queryString from 'query-string';

class QADashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundImage: require("../../images/lib1.jpg")
    };
  }

  componentDidMount() {
    if (this.props.hasOwnProperty('location') && this.props.location.search) {
      const values = queryString.parse(this.props.location.search);
      if (values.user) {
        Store.user = values.user;
        this.setState({
          user: values.user,
          isLoggedIn: true
        });
      }
    } else if (Store.user) {
      this.setState({
        user: Store.user,
        isLoggedIn: true
      });
    }
  }

  render() {
    const { backgroundImage } = this.state;

    return (
      <Container>
        <div id="welcomeDash">
          <img className="d-block w-100" src={`${backgroundImage}`} alt="welcome" />
          <div className="carousel-caption d-none d-md-block">
            <h3 className="text-white">Behold! A library in which you can find everything you have ever wanted to search for!</h3>
            <p>But not really...</p>
          </div>
        </div>
      </Container>
    );
  }
}
export default QADashboard;
