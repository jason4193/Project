import React, { useState } from 'react';
import Cookie from 'js-cookie';
import Navi from './Navi';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Login failed');
        }
        return response.json();
      })
      .then(data => {
        console.log('Login successful', data);
        Cookie.set('session', data.token);
        window.location.href = '/';
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        alert('Login failed');
      });
  };

  return (
    <div className="App">
      <Navi />
      <div className="form-card">
        <h1>Login</h1>
        <pre>User: user1 Password: simplepassword</pre>
        <form onSubmit={handleLogin}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;