import React, { useState } from "react";
import axios from "axios";
import { Button, Form, InputGroup } from "react-bootstrap";

const Login = () => {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("/auth/login", formData);
      const token = response.data.token;
      localStorage.setItem("TOKEN", token);
      window.location.reload();
    } catch (error) {
      console.error("ERROR - Could Not Log In", error);
      setError("Invalid Username or Password");
    }
  };

  return (
    <>
      <Form inline>
        <InputGroup>
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          <Form.Control
            type="text"
            name="username"
            placeholder="username"
            value={formData.username}
            onChange={handleChange}
          />
        </InputGroup>
      </Form>
      <Form inline>
        <InputGroup>
          <Form.Control
            type="password"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
          />
        </InputGroup>
      </Form>
      <Form inline>
        <InputGroup style={{marginTop: "15px"}}>
          <Button
            variant="outline-success"
            style={{ marginRight: "20px" }}
            onClick={handleLogin}
            type="button"
            className="mb-3"
          >
            Login
          </Button>
        </InputGroup>
      </Form>
    </>
  );
};

export default Login;