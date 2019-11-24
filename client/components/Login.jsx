import React, { Component } from 'react';

const Login = (props) => {
  const {authenticateUser} = props;
  return (
  <form className="login-form">
    username
    <input type="text" name="username"/><br></br>
    password
    <input type="text" name="password"/>
    <input type="button" name="login" value="login" onClick={authenticateUser}/>
  </form>
)}

export default Login
