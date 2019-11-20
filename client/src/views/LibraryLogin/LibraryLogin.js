import {
  Container,
  Form,
  FormInput,
  Row
} from "shards-react";
import { Link, Route, Switch } from 'react-router-dom';

import React from "react";
import Registration from "../Registration/Registration";

class LibraryLogin extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }

  handleInputChange = (event) => {
    const { value, id } = event.target;
    this.setState({
      [id]: value
    });
  }
  onSubmit = (event) => {
    event.preventDefault();
    fetch('/api/users/authenticate', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(res => {
        if (res.success) this.props.history.push('/');
        else alert(`Error logging in: ${res.error}`);
      });
  }

  render() {
    return (
      <Container>
        <Row>
          <Form className="login-registration" onSubmit={this.onSubmit}>
            <h1>QA Library Log in</h1>
            <FormInput
              id="email"
              type="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.handleInputChange}
              required
            />
            <FormInput
              id="password"
              type="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.handleInputChange}
              required
            />
            <FormInput id="submit-button" className="btn btn-success btn-lg" type="submit" value="Submit" />
            <Link id="registration-link" to="/registration">Register</Link>
            <Switch>
              <Route path="/registration" exact component={Registration} />
            </Switch>
          </Form>
        </Row>
      </Container>
    );
  }
}
export default LibraryLogin;
