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

class App extends Component {
  constructor() {
    super();
    this.authenticateUser = this.authenticateUser.bind(this);
    this.state = {
      username: null,
      status: null, // success | loading | fail
    }
  }

  authenticateUser(eventObj) {
    const loginForm = document.querySelector('.login-form');
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    console.log('hello', username)

    const myBody = {
      username: username,
      password: password
    }

    fetch('/auth', {
      method: 'POST',
      body: JSON.stringify(myBody),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(status => {
        console.log(status);
        this.setState(status);
      })
      .catch(err => console.log(err))
  }

  render() {
    console.log('hi')
    const {status} = this.state
    console.log('state', this.state)
    console.log('status', status)
    let comp;
    switch (status) {
      case "success":
        comp = <List />;
        break;
      case "loading":
        comp = <div>loading . . . </div>
        break;
      case "fail":
        comp = <div>FAIL!</div>
        break;
      default:
        comp = <Login authenticateUser={this.authenticateUser}/> 
        break;
    }
    return <div>
      {comp}
      <button onClick={() => this.setState({status: "loading"})}>LOADING</button>
      <button onClick={() => this.setState({status: "success"})}>SUCCESS</button>
      <button onClick={() => this.setState({status: "fail"})}>FAIL</button>
      <button onClick={() => this.setState({status: null})}>RESET</button>
      <button onClick={() => this.setState({status: null})}>LOGIN</button>
    </div>

  }
}


// const App = () => (
//  <Router>
//     <div>
//       <Login fakeAuth={fakeAuth}/>

//       <Switch>
//         {/* <Route path="/signup">
//           <Signup />
//         </Route> */}
//         <Route path="/protected">
//           <List />
//         </Route>
//       </Switch>
//     </div>
//   </Router>

  // <div className="App">
  //   <List />
  // </div>
// );

export default App;
