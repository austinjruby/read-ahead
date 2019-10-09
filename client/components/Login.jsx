import React, { Component } from 'react';
import {useHistory, useLocation} from 'react-router-dom'

const Login = (props) => {
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/" } };
  const login = () => {
    console.log('hello')
    props.fakeAuth.authenticate(() => {
      console.log('succcccc')
      history.replace(from);
    });
  }
  return (
  <form>
    username
    <input type="text" name="username"/><br></br>
    password
    <input type="text" name="password"/>
    <input type="button" name="login" value="login" onClick={login}/>
  </form>
)}

export default Login
