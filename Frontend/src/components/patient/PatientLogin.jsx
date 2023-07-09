import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import '../Login/LoginForm.css';

const PatientLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:7010/api/Login/Patient', {
        Username: username,
        Password: password
      });

      const {token,patient_ID} = response.data;

      window.location.href = '/PatientLanding';
      localStorage.setItem('token', token);
      localStorage.setItem('patient_ID', patient_ID);

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
      {error && <p className="error">{error}</p>}
      <Button type="submit" variant="contained">Login</Button>
    </form>
  );
};

export default PatientLogin;
