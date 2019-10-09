import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from 'react-router-dom';
import List from './List';
import Login from './Login';
// import PrivateRoute from './PrivateRoute';

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
}

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

const App = () => (
  <Router>
    <div>
      <Login fakeAuth={fakeAuth}/>

      <Switch>
        {/* <Route path="/signup">
          <Signup />
        </Route> */}
        <PrivateRoute path="/protected">
          <List />
        </PrivateRoute>
      </Switch>
    </div>
  </Router>

  // <div className="App">
  //   <List />
  // </div>
);

export default App;
