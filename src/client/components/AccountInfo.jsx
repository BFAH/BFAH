import React, { useState, useEffect } from "react";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const AccountInfo = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [account, setAccount] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [TOKEN] = useState(localStorage.getItem("TOKEN"));



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
      const result = await axios.post(
        `/api/users/account/create`,
        accountForm,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("TOKEN"),
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.patch(
        `/api/users/account/edit`,
        { ...accountForm, accountId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("TOKEN"),
          },
        }
      ); 
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAuction = async (auctionId) => {
    const deleteConfirmed = window.confirm(
      "Are you sure you want to delete this auction?"
    );
    if (deleteConfirmed) {
      try {
        await axios.delete(`/api/auctions/${auctionId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("TOKEN"),
          },
        });

        // // Refresh the AccountInfo page after successful deletion
        window.location.reload();
      } catch (error) {
        console.log("Error deleting auction:", error);
      }
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
        setAccount(userInfo.Account[0]);
        setAccountId(userInfo.Account[0].id);
        console.log(userInfo);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentUser();
  }, [TOKEN]);

  console.log(currentUser);
  console.log(account);
  console.log(accountId);

  return (
    <>
      {!TOKEN ? (
        <div></div>
      ) : (
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
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Button type="submit" onClick={handleCreate}>
                    Submit form
                  </Button>
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
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Button type="submit" onClick={handleEdit}>
                    Submit changes
                  </Button>
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          )}
          <Accordion.Item eventKey="2">
            <Accordion.Header>My Store</Accordion.Header>
            <Accordion.Body className="cards">
              {currentUser &&
                currentUser.Auctions.map((user, idx) => {
                  return (
                    <Card style={{ width: "20rem" }}>
                      <Card.Img
                        variant="top"
                        src={user.products.imageUrl}
                        alt={user.products.name}
                      />
                      <Card.Body>
                        <Card.Title>{user.products.name}</Card.Title>
                        <Card.Text>{user.products.description}</Card.Text>
                      </Card.Body>
                      <ListGroup className="list-group-flush">
                        <ListGroup.Item>
                          Current highest bid: ${user.currentBidPrice}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          Time Left:{" "}
                          {new Date(user.bidEndTime).toLocaleString()}
                        </ListGroup.Item>
                      </ListGroup>
                      <Card.Body>
                        <Card.Link href="/">Home</Card.Link>
                        <Card.Link href={`/${user.products.id}`}>
                          Auctions Details
                        </Card.Link>
                      </Card.Body>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteAuction(user.id)}
                      >
                        Delete Auction
                      </Button>
                    </Card>
                  );
                })}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
    </>
  );
};

export default AccountInfo;
