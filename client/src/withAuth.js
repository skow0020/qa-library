import React from 'react';

import { Navigate  } from 'react-router-dom';

export default function WithAuth({isLoggedIn, ComponentToProtect}) {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
    
  return ComponentToProtect;
  // useEffect(() => {
  //   getArticles();
  // }, []);


  // return class extends Component {
  //   constructor() {
  //     super();
  //     this.state = {
  //       loading: true,
  //       redirect: false
  //     };
  //   }

  //   componentDidMount() {
  //     fetch('/checkToken')
  //       .then(res => {
  //         if (res.status === 200) this.setState({ loading: false });
  //         else throw new Error(res.error);
  //       })
  //       .catch(() => {
  //         this.setState({ loading: false, redirect: true });
  //       });
  //   }
    
    // render() {
    //   const { loading, redirect } = this.state;
    //   if (loading) return null;
    //   if (redirect) return <Navigate  to="/library-login" />;

      // return (
      //   <React.Fragment>
      //     <ComponentToProtect />
      //   </React.Fragment>
      // );
    // }
  // };
}