import React from 'react';
import {Route, Redirect} from 'react-router-dom';

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
          console.log('eat a big one')
          // <Redirect
          //   to={{
          //     pathname: "/login",
          //     state: { from: location }
          //   }}
          // />
        )
      }
    />
  );
}

export default PrivateRoute