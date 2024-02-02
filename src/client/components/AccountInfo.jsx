import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  Button,
  Col,
  Form,
  Row,
  Card,
  ListGroup,
  Alert,
} from "react-bootstrap";

const AccountInfo = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [allUsers, setAllUsers] = useState(null);
  const [userBids, setUserBids] = useState(null);
  const [orderHistory, setOrderHistory] = useState(null);
  const [account, setAccount] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const TOKEN = localStorage.getItem("TOKEN");
  const [successMessage, setSuccessMessage] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
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
      setSuccessMessage("Your Account Details Have Been Successfully Updated!");
      setShowMessage(true);
      setTimeout(() => {
        setSuccessMessage(null);
        setShowMessage(true);
      }, 7000);
    } catch (error) {
      console.log(error);
    }
  };

  const makeAdmin = async (id) => {
    try {
      const result = await axios.patch(`/api/users/admin/${id}`);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAdmin = async (id) => {
    try {
      const result = await axios.patch(`/api/users/admin/remove/${id}`);
      console.log(result);
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
        window.location.reload();
      } catch (error) {
        console.log("Error deleting auction:", error);
      }
    }
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const result1 = await axios.get(`/api/users/current/user`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("TOKEN"),
          },
        });
        const result2 = await axios.get(`/api/auctions/current/bids`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("TOKEN"),
          },
        });
        const result3 = await axios.get(`/api/auctions/order/history`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("TOKEN"),
          },
        });
        const result4 = await axios.get(`/api/users`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("TOKEN"),
          },
        });
        const userInfo = result1.data;
        const myBids = result2.data;
        const complete = result3.data;
        const getAllUsers = result4.data;

        setAllUsers(getAllUsers);
        setCurrentUser(userInfo);
        setAccount(userInfo.Account[0]);
        setAccountId(userInfo.Account[0].id);
        setAccountForm({
          firstName: userInfo.Account[0].firstName,
          lastName: userInfo.Account[0].lastName,
          streetAddress: userInfo.Account[0].streetAddress,
          city: userInfo.Account[0].city,
          state: userInfo.Account[0].state,
          zipCode: userInfo.Account[0].zipCode,
          country: userInfo.Account[0].country,
          phoneNumber: userInfo.Account[0].phoneNumber,
        });
        setUserBids(myBids);
        setOrderHistory(complete);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.isAdmin === true) {
      setAdmin(true);
    }
  }, [currentUser]);

  return (
    <>
      {!TOKEN ? (
        <Alert variant="warning">
          <Alert.Heading>
            Welcome to Big Fancy Auction House! We're delighted to have you
            here!
          </Alert.Heading>
          <p>
            Step into a world of finding the best deals for just about anything
            you want! But of course making moneeeey!! We're thrilled to share
            this journey with you!
          </p>
          <hr />
          <p className="mb-0">
            Click around and see what surprises we have in store for you! Your
            journey on Big Fancy Auction House starts with a single click!
          </p>
        </Alert>
      ) : (
        <Accordion>
          {!account ? (
            <Accordion.Item eventKey="0">
              <Accordion.Header>Account Information</Accordion.Header>
              <Accordion.Body style={{ backgroundColor: "#def2f1" }}>
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
              <Accordion.Body style={{ backgroundColor: "#def2f1" }}>
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
                    Save changes
                  </Button>
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          )}
          <Accordion.Item eventKey="2">
            <Accordion.Header>My Store</Accordion.Header>
            <Accordion.Body
              className="accordion-cards"
              style={{ backgroundColor: "#def2f1" }}
            >
              {currentUser &&
                currentUser.Auctions.map((user, idx) => {
                  return (
                    <Card style={{ width: "20rem" }}>
                      <Card.Img
                        variant="top"
                        style={{ height: "254px", width: "318px" }}
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
                        <Card.Link href="/">
                          {" "}
                          <Button variant="success">Home</Button>
                        </Card.Link>
                        <Card.Link href={`/${user.products.id}`}>
                          <Button variant="warning">Auction Details</Button>
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
          {!userBids ? (
            <></>
          ) : (
            <Accordion.Item eventKey="3">
              <Accordion.Header>My Bids</Accordion.Header>
              <Accordion.Body
                className="accordion-cards"
                style={{ backgroundColor: "#def2f1" }}
              >
                {userBids &&
                  userBids.map((user, idx) => {
                    return (
                      <Card style={{ width: "20rem" }}>
                        <Card.Img
                          variant="top"
                          style={{ height: "254px", width: "318px" }}
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
                          <Card.Link href={`/store/${user.userId}`}>
                            <Button variant="warning">Seller's store</Button>
                          </Card.Link>
                          <Card.Link href={`/${user.products.id}`}>
                            <Button variant="success">Auction Details</Button>
                          </Card.Link>
                        </Card.Body>
                      </Card>
                    );
                  })}
              </Accordion.Body>
            </Accordion.Item>
          )}
          {!orderHistory ? (
            <></>
          ) : (
            <Accordion.Item eventKey="4">
              <Accordion.Header>Order History</Accordion.Header>
              <Accordion.Body
                className="accordion-cards"
                style={{ backgroundColor: "#def2f1" }}
              >
                {orderHistory &&
                  orderHistory.map((user, idx) => {
                    return (
                      <Card style={{ width: "20rem" }}>
                        <Card.Img
                          variant="top"
                          style={{ height: "254px", width: "318px" }}
                          src={user.products.imageUrl}
                          alt={user.products.name}
                        />
                        <Card.Body>
                          <Card.Title>{user.products.name}</Card.Title>
                          <Card.Text>{user.products.description}</Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                          <ListGroup.Item>
                            You've won this Auction!
                          </ListGroup.Item>
                        </ListGroup>
                        <Card.Body>
                          <Card.Link href={`/store/${user.userId}`}>
                            <Button variant="warning">Seller's store</Button>
                          </Card.Link>
                          <Card.Link href={`/${user.products.id}`}>
                            <Button variant="success">Auction Details</Button>
                          </Card.Link>
                        </Card.Body>
                      </Card>
                    );
                  })}
              </Accordion.Body>
            </Accordion.Item>
          )}
          {!admin ? (
            <></>
          ) : (
            <Accordion.Item eventKey="5">
              <Accordion.Header>Admin</Accordion.Header>
              <Accordion.Body
                className="accordion-cards"
                style={{ backgroundColor: "#def2f1" }}
              >
                {allUsers &&
                  allUsers.map((user, idx) => {
                    return (
                      <Card style={{ width: "20rem", borderColor: "black" }}>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => makeAdmin(user.id)}
                        >
                          Make Admin
                        </Button>
                        <Card.Link
                          href={`/store/${user.id}`}
                          style={{ marginTop: "10px" }}
                        >
                          <Button variant="outline-dark">
                            {user.username}
                          </Button>
                        </Card.Link>
                        <div className="cards">
                          {user.Auctions.map((auction, idx) => {
                            return (
                              <Card
                                style={{ width: "8rem", borderColor: "black" }}
                              >
                                <Card.Img
                                  variant="top"
                                  src={auction.products.imageUrl}
                                  alt={auction.products.name}
                                />
                                <Card.Body>
                                  <Card.Text>{auction.products.name}</Card.Text>
                                </Card.Body>
                                <Button
                                  variant="danger"
                                  onClick={() => handleDeleteAuction(user.id)}
                                >
                                  Delete
                                </Button>
                              </Card>
                            );
                          })}
                        </div>
                        <Button
                          variant="warning"
                          size="sm"
                          style={{ marginTop: "10px" }}
                          onClick={() => deleteAdmin(user.id)}
                        >
                          Delete Admin
                        </Button>
                      </Card>
                    );
                  })}
              </Accordion.Body>
            </Accordion.Item>
          )}
        </Accordion>
      )}
      {showMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
    </>
  );
};

export default AccountInfo;
