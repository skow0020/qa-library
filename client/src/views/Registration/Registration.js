import AlertModal, { showAlert } from "../../components/common/AlertModal";
import {
  Container,
  Form,
  FormInput,
  Row
} from "shards-react";

import React from "react";

class Registration
  extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    fetch('/api/users/register', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then((res, err) => {
        if (res.error) this.showNotifier(res.error);
        else {
          this.showNotifier(`Welcome, ${res.email}, Please sign in`);
          this.nextPath('/');
        }
      });
  }

  showNotifier = (message) => {
    showAlert({ message });
  }

  nextPath(path) {
    setTimeout(function () {
      this.props.history.push(path);
    }.bind(this), 2000);
  }

  render() {
    return (
      <Container>
        <AlertModal />
        <Row>
          <Form onSubmit={this.onSubmit}>
            <h1>Sign up Below!</h1>
            <FormInput
              type="email"
              name="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.handleInputChange}
              required
            />
            <FormInput
              type="password"
              name="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.handleInputChange}
              required
            />
            <FormInput className="btn btn-success btn-lg" type="submit" value="Register" />
          </Form>
        </Row>
      </Container>
    );
  }
}
export default Registration;
