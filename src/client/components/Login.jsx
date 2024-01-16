import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("/auth/login", formData);

      const token = response.data.token;
      localStorage.setItem("TOKEN", token);

      navigate("/");
    } catch (error) {
      console.error("ERROR - Could Not Log In", error);
    }
  };

  const handleRegisterNavigate = () => {
    navigate("/register");
  };

  return (
    <>
      <h1>Login</h1>
      <form>
        <label>
          Username
          <br />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        <label>
          Password
          <br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        <p>Or</p>
        <button type="button" onClick={handleRegisterNavigate}>
          Register?
        </button>
      </form>
    </>
  );
};

export default Login;
