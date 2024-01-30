import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleRegister = async () => {
    try {
      const response = await axios.post("/auth/register", formData);
      const token = response.data.token;
      localStorage.setItem("TOKEN", token);
      navigate("/");
    } catch (error) {
      console.error("ERROR - Could Not Register New User", error);
      setError("Username or Email is unavailable.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="text-center">
        <h1>Register</h1>
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}

            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Button onClick={handleRegister} type="button" className="mb-3">Register</Button>
        </Form>

        <p>Or</p>
        <Button onClick={() => navigate("/login")}>Login?</Button>
      </div>
    </div>
  );
};

export default Register;
