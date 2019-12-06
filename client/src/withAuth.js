import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false
      };
    }

    componentDidMount() {
      fetch('/checkToken')
        .then(res => {
          if (res.status === 200) this.setState({ loading: false });
          else throw new Error(res.error);
        })
        .catch(() => {
          this.setState({ loading: false, redirect: true });
        });
    }
    
    render() {
      const { loading, redirect } = this.state;
      if (loading) return null;
      if (redirect) return <Redirect to="/library-login" />;

      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  };
}