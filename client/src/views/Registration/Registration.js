import AlertModal, { showAlert } from "../../components/common/AlertModal";
import {
  Container,
  Form,
  FormInput,
  Row
} from "shards-react";
import { Link, Route, Switch } from 'react-router-dom';

import LibraryLogin from "../LibraryLogin/LibraryLogin";
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
    const { value, id } = event.target;
    this.setState({
      [id]: value
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
          <Form className="login-registration" onSubmit={this.onSubmit}>
            <h1>Sign up</h1>
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
            <FormInput id="registration-button" className="btn btn-success btn-lg" type="submit" value="Register" />
            <Link id="login-link" to="/library-login">Login</Link>
            <Switch>
              <Route path="/library-login" exact component={LibraryLogin} />
            </Switch>
          </Form>
        </Row>
      </Container>
    );
  }
}
export default Registration;
