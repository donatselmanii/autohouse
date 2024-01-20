import React, { useState } from 'react';
import axios from '../utils/csrf';
import Cookies from 'js-cookie';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const login = () => {
    axios.post("http://localhost:8082/api/auth/signin", {
      username: username,
      password: password,
    }, {
      withCredentials: true,
      headers: {
        'X-CSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
      },
    }).then((response) => {
      console.log('Login successful:', response.data);
    }).catch((error) => {
      console.log('Full error object:', error);
  
      if (error.response && error.response.status === 429) {
        setErrorMessage('Too many login attempts. Please try again later.');
      } else {
        setErrorMessage('Invalid username or password.');
      }
    });
  };

  return (
    <div>
      <h5>Login</h5>
      <p>Don't have an account? <a href="/Register">Create Your Account</a> it takes less than a minute</p>
      <div>
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <br />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      </div>

      <br /><br />

      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

      <br />
      <button onClick={login}>Log In</button>
    </div>
  );
}

export default Login;