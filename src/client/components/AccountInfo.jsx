import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";

const EditAccountInfo = () => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [userAuctions, setUserAuctions] = useState([]);
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

  useEffect(() => {
    const getCurrentAccount = async () => {
      try {
        const result = await axios.get(`/api/users/current/user`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("TOKEN"),
          },
        });
        const userInfo = result.data;
        setCurrentAccount(userInfo);
        console.log(userInfo);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentAccount();
  }, []);

  useEffect(() => {
    const getUserAuctions = async () => {
      try {
        const result = await axios.get(`/api/auctions/user`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("TOKEN"),
          },
        });
        const userInfo = result.data;
        setUserAuctions(userInfo);
        console.log(userInfo);
      } catch (error) {
        console.log(error);
      }
    };
    getUserAuctions();
  }, []);

  return (
    <>
      <Accordion>
        {!currentAccount ? (
          <Accordion.Item eventKey="0">
            <Accordion.Header>Account Information</Accordion.Header>
            <Accordion.Body>
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
            </Accordion.Body>
          </Accordion.Item>
        ) : (
          <Accordion.Item eventKey="1">
            <Accordion.Header>Account Information</Accordion.Header>
            <Accordion.Body>
              <form>
                <label>
                  First Name
                  <input
                    type="text"
                    name="firstName"
                    placeholder={currentAccount.firstName}
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Last Name
                  <input
                    type="text"
                    name="lastName"
                    placeholder={currentAccount.lastName}
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Street Address
                  <input
                    type="text"
                    name="streetAddress"
                    placeholder={currentAccount.streetAddress}
                    value={formData.streetAddress}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  City
                  <input
                    type="text"
                    name="city"
                    placeholder={currentAccount.city}
                    value={formData.city}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  State
                  <input
                    type="text"
                    name="state"
                    placeholder={currentAccount.state}
                    value={formData.state}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Zip Code
                  <input
                    type="text"
                    name="zipCode"
                    placeholder={currentAccount.zipCode}
                    value={formData.zipCode}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Country
                  <input
                    type="text"
                    name="country"
                    placeholder={currentAccount.country}
                    value={formData.country}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Phone Number
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder={currentAccount.phoneNumber}
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </label>
                <button type="button" onClick={handleSubmit}>
                  Save changes
                </button>
              </form>
            </Accordion.Body>
          </Accordion.Item>
        )}
        <Accordion.Item eventKey="0">
          <Accordion.Header>My Store</Accordion.Header>
          <Accordion.Body>
            <div className="cards">
              {userAuctions.map((product) => {
                return (
                  <div key={product.products.id}>
                    <Link
                      to={`/${product.products.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        style={{
                          height: "380px",
                          width: "300px",
                          border: "black solid 4px",
                          margin: "20px",
                          backgroundColor: "#def2f1",
                          color: "black",
                        }}
                      >
                        <h3>{product.products.name}</h3>
                        <p>{product.products.description}</p>
                        <img
                          src={product.products.imageUrl}
                          style={{ height: "100px", width: "100px" }}
                        />
                        <h4>Current Bid: ${product.currentBidPrice}</h4>
                        <h5>
                          Bid End:{" "}
                          {new Date(product.bidEndTime).toLocaleString()}
                        </h5>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default EditAccountInfo;
