import React, { useState } from "react";
import axios from "axios";

const EditAccountInfo = () => {
  const [formData, setFormData] = useState({
    firstName: ``,
    lastName: ``,
    streetAddress: ``,
    city: ``,
    zipCode: ``,
    state: ``,
    country: ``,
    phoneNumber: ``,
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(`/api/users/account/create`, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("TOKEN"),
        },
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1> Edit Account Information</h1>
      <form>
        <label>
          First Name
          <input
            type="text"
            name="firstName"
            placeholder="Enter First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            name="lastName"
            placeholder="Enter Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </label>
        <label>
          Street Address
          <input
            type="text"
            name="streetAddress"
            placeholder="Enter Street Address"
            value={formData.streetAddress}
            onChange={handleChange}
          />
        </label>
        <label>
          City
          <input
            type="text"
            name="city"
            placeholder="Enter City"
            value={formData.city}
            onChange={handleChange}
          />
        </label>
        <label>
          State
          <input
            type="text"
            name="state"
            placeholder="Enter State"
            value={formData.state}
            onChange={handleChange}
          />
        </label>
        <label>
          Zip Code
          <input
            type="text"
            name="zipCode"
            placeholder="Enter Zip Code"
            value={formData.zipCode}
            onChange={handleChange}
          />
        </label>
        <label>
          Country
          <input
            type="text"
            name="country"
            placeholder="Enter Country"
            value={formData.country}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone Number
          <input
            type="text"
            name="phoneNumber"
            placeholder="000-000-0000"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </label>
        <button type="button" onClick={handleSubmit}>
          Save changes
        </button>
      </form>
    </>
  );
};

export default EditAccountInfo;
