import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ShippingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/users/shipping-info", formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("TOKEN"),
        },
      });

      // Redirect to the payment portal or another relevant page
      navigate("/payment");
    } catch (error) {
      console.error("ERROR - Could Not Submit Shipping Info", error);
    }
  };
  return (
    <>
      <h1>Shipping Information</h1>
      <p>Please provide the following:</p>
      <form>
        <label>
          First Name
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </label>
        < br/>
        < br/>
        <label>
          Last Name
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </label>
        < br/>
        < br/>
        <label>
          Street Address
          <input
            type="text"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleChange}
          />
        </label>
        < br/>
        < br/>
        <label>
          City
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </label>
        < br/>
        < br/>
        <label>
          State
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
        </label>
        < br/>
        < br/>
        <label>
          Zip Code
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
          />
        </label>
        < br/>
        < br/>
        <label>
          Phone Number
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </label>
        < br/>
        < br/>
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </>
  );
};

export default ShippingForm;
