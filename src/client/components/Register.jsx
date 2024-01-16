import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });


  const handleRegister = async () => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    try {
      // token request
      const response = await axios.post("auth/register", formData);
      
      // if sucessful, store locally
      const token = response.data.token;
      localStorage.setItem("TOKEN", token);
    
      // take user to home page
      navigate("/");

    } catch (error) {
      console.error("ERROR - Could Not Register New User", error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form>
        <label>
          Email
          < br/>
          <input
            type="text"
            name="email"
            value={formData.email}
            
          />
        </label>
        <br />
        <label>
          Username
          < br/>
          <input
            type="text"
            name="username"
            value={formData.username}
           
          />
        </label>
        <br />
        <label>
          Password
          < br/>
          <input
            type="password"
            name="password"
            value={formData.password}
            
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
