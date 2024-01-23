import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const AccountInfo = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [account, setAccount] = useState(null);
  const [accountId, setAccountId] = useState(null) 

  const [accountForm, setAccountForm] = useState({
    firstName: ``,
    lastName: ``,
    streetAddress: ``,
    city: ``,
    state: ``,
    zipCode: ``,
    country: ``,
    phoneNumber: ``,
  });

  const handleChange = (e) => {
    setAccountForm({ ...accountForm, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(`/api/users/account/create`, accountForm, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("TOKEN"),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.patch(`/api/users/account/edit`, {accountForm, accountId}, {
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
        setAccountId(userInfo.Account[0].id)
        console.log(userInfo)
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentUser();
  }, []);

  console.log(currentUser)
  console.log(account)
  console.log(accountId)


  return (
    <>
      <Accordion>
        {!account ? (
          <Accordion.Item eventKey="0">
            <Accordion.Header>Account Information</Accordion.Header>
            <Accordion.Body>
              <Form noValidate>
                <Row className="mb-3">
                  <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      placeholder="Enter First Name"
                      value={accountForm.firstName}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      placeholder="Enter Last Name"
                      value={accountForm.lastName}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationCustom03">
                    <Form.Label>Street Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Street Address"
                      name="streetAddress"
                      value={accountForm.streetAddress}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback>
                      Looks good!
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom04">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter City"
                      name="city"
                      value={accountForm.city}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback>
                      Looks good!
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="validationCustom05">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter State"
                      name="state"
                      value={accountForm.state}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback>
                      Looks good!
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="validationCustom06">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Zip Code"
                      name="zipCode"
                      value={accountForm.zipCode}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback>
                      Looks good!
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom07">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Country"
                      name="country"
                      value={accountForm.country}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback>
                      Looks good!
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="validationCustom08">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="000-000-0000"
                      name="phoneNumber"
                      value={accountForm.phoneNumber}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback>
                      Looks good!
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Button type="submit" onClick={handleCreate}>Submit form</Button>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        ) : (
          <Accordion.Item eventKey="1">
            <Accordion.Header>Account Information</Accordion.Header>
            <Accordion.Body>
            <Form noValidate>
                <Row className="mb-3">
                  <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      placeholder={account.firstName}
                      value={accountForm.firstName}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      placeholder={account.lastName}
                      value={accountForm.lastName}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationCustom03">
                    <Form.Label>Street Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="streetAddress"
                      placeholder={account.streetAddress}
                      value={accountForm.streetAddress}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback>
                      Looks good!
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom04">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      placeholder={account.city}
                      value={accountForm.city}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback>
                      Looks good!
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="validationCustom05">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      name="state"
                      placeholder={account.state}
                      value={accountForm.state}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback>
                      Looks good!
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="validationCustom06">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="zipCode"
                      placeholder={account.zipCode}
                      value={accountForm.zipCode}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback>
                      Looks good!
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom07">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      name="country"
                      placeholder={account.country}
                      value={accountForm.country}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback>
                      Looks good!
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="validationCustom08">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="phoneNumber"
                      placeholder={account.phoneNumber}
                      value={accountForm.phoneNumber}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback>
                      Looks good!
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Button type="submit" onClick={handleEdit}>Submit changes</Button>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        )}
        <Accordion.Item eventKey="2">
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
