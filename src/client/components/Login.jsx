import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false
  });
  
  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleLogin = async () => {
    try {
      console.log(formData);
      const response = await axios.post("/auth/login", formData);
      const token = response.data.token;
      localStorage.setItem("TOKEN", token);
      console.log(response.data)

      navigate("/");
    } catch (error) {
      console.error("ERROR - Could Not Log In", error);
      setError("Invalid Username or Password")
    }
  };

  const handleRegisterNavigate = () => {
    navigate("/register");
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="text-center">
        <h1>Login</h1>
        {error && <p style={{color: "red" }}>{error}</p>}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              id="autoSizingCheck2"
              label="Remember me"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
          </Form.Group>
          
          <Button onClick={handleLogin} type="button" className="mb-3">Login</Button>
        </Form>
        
        <p>Or</p>
        <Button onClick={handleRegisterNavigate}>Register?</Button>
      </div>
    </div>
  );
};

export default Login;
