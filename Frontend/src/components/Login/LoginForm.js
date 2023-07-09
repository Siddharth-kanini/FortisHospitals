import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import './LoginForm.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (role === 'admin') {
        response = await axios.post('https://localhost:7177/api/Authorize/Admin', {
          AdminName: username,
          AdminPassword: password
        });
      } else if (role === 'doctor') {
        response = await axios.post('https://localhost:7089/api/Authorize/Doctor', {
          Username: username,
          Password: password

        });
      } else {
        throw new Error('Invalid role');
      }

      const token = response.data;

     


      if (role === 'doctor') {
        window.location.href = '/doctordashboard';
        localStorage.setItem('username', username);
        localStorage.setItem('token', token);

      } else {
        console.log('Admin logged in');
        localStorage.setItem('token', token);
        setUsername('');
        setPassword('');
        setError('');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <h2>Login</h2>

      <TextField
        label="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <br></br>
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <ToggleButtonGroup
        value={role}
        exclusive
        onChange={(e, newRole) => setRole(newRole)}
        className="role-toggle"
      >
        <ToggleButton value="admin">Admin</ToggleButton>
        <ToggleButton value="doctor">Doctor</ToggleButton>
      </ToggleButtonGroup>
      {error && <p className="error">{error}</p>}
      <Button type="submit" variant="contained">Login</Button>
    </form>
  );
};

export default LoginForm;
