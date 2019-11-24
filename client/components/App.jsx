import React, { Component } from 'react';
import List from './List';
import Login from './Login';

class App extends Component {
  constructor() {
    super();
    this.authenticateUser = this.authenticateUser.bind(this);
    this.state = {
      userId: null,
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
      .then(newState => {
        console.log(newState);
        this.setState(newState);
      })
      .catch(err => console.log(err))
  }

  render() {
    const {status} = this.state
    let comp;
    switch (status) {
      case "success":
        comp = <List userId={this.state.userId}/>;
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
    </div>

  }
}

export default App;
