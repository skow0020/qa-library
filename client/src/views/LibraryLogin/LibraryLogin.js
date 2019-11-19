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
    const { value, name } = event.target;
    this.setState({
      [name]: value
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
        if (res.status === 200) this.props.history.push('/');
        else alert(`Error logging in: ${res.error}`);        
      });
  }

  render() {
    return (
      <Container>
        <Row>
          <Form onSubmit={this.onSubmit}>
            <h1>Login Below!</h1>
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
            <FormInput className="btn btn-success btn-lg" type="submit" value="Submit" />
            <Link to="/registration">Register</Link>
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
