import React, { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Auth from '../authentication/auth';
import "../css/Login.css";

function Login(props) {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };
  // username: "mor_2314",
  // password: "83r5^_"
  const handleSubmit = (event) => {
   debugger
    //Prevent page reload
    event.preventDefault();
    var { uname, pass } = document.forms[0];
    axios.post('https://fakestoreapi.com/auth/login', {
      username: uname.value,
      password: pass.value
    })
      .then(function (response) {
        if (response.data.token) {
          Auth.setToken(response.data.token);
          navigate("/");
        } else {
          setErrorMessages({ name: "uname", message: errors.uname });
        }

      })
      .catch(function (error) {
        setErrorMessages({ name: "pass", message: errors.pass });
      });


  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <div className="centering">
        <form onSubmit={handleSubmit} as={NavLink} to="/Home">
          <div className="input-container">
            <label>Username </label>
            <input type="text" name="uname" required />
            {renderErrorMessage("uname")}
          </div>
          <div className="input-container">
            <label>Password </label>
            <input type="password" name="pass" required />
            {renderErrorMessage("pass")}
          </div>
          <div className="button-container">
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="App">
      <div className="login-form">
        <div align="center">
          <img src="shoppingCartOrange.png" alt=""></img>
        </div>
        <div className="title" >Log In</div>
        {isSubmitted ?
          <div>

          </div>
          : renderForm}
      </div>
    </div>
  );
}

export default Login;