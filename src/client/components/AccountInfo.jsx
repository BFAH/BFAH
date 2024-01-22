import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";

const AccountInfo = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [account, setAccount] = useState(null);
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const result = await axios.get(`/api/users/current/user`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("TOKEN"),
          },
        });
        const userInfo = result.data;
        setCurrentUser(userInfo);
        setAccount(userInfo.Account[0])
        console.log(userInfo)
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentUser();
  }, []);

  console.log(currentUser)
  console.log(account)


  return (
    <>
      <Accordion>
        {!account ? (
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
                    placeholder={account.firstName}
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Last Name
                  <input
                    type="text"
                    name="lastName"
                    placeholder={account.lastName}
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Street Address
                  <input
                    type="text"
                    name="streetAddress"
                    placeholder={account.streetAddress}
                    value={formData.streetAddress}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  City
                  <input
                    type="text"
                    name="city"
                    placeholder={account.city}
                    value={formData.city}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  State
                  <input
                    type="text"
                    name="state"
                    placeholder={account.state}
                    value={formData.state}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Zip Code
                  <input
                    type="text"
                    name="zipCode"
                    placeholder={account.zipCode}
                    value={formData.zipCode}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Country
                  <input
                    type="text"
                    name="country"
                    placeholder={account.country}
                    value={formData.country}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Phone Number
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder={account.phoneNumber}
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
            {currentUser && currentUser.Auctions.map((user, idx) => {
              return (
                <div className="cards" key={idx}>
                  <div>
                    <Link
                      to={`/${user.products.id}`}
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
                        <h3>{user.productId}</h3>
                        <p>{user.products.description}</p>
                        <img
                          src={user.products.imageUrl}
                          style={{ height: "100px", width: "100px" }}
                        />
                        <h4>Current Bid: ${user.currentBidPrice}</h4>
                        <h5>
                          Bid End:{" "}
                          {new Date(user.bidEndTime).toLocaleString()}
                        </h5>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default AccountInfo;
