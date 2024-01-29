import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] =useState();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });


  const handleRegister = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    try {
      const response = await axios.post("/auth/register", formData);
      const token = response.data.token;
      localStorage.setItem("TOKEN", token);
      navigate("/");

    } catch (error) {
      console.error("ERROR - Could Not Register New User", error);
      setError("Username or Email is unavailable.")
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form>
        <label>
          Email
          < br/>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            
          />
        </label>
        <br />
        <br />
        <label>
          Username
          < br/>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}

           
          />
        </label>
        <br />
        <br />
        <label>
          Password
          < br/>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}

            
          />
        </label>
        <br />
        <br />
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
