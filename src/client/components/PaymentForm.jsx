import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, ListGroup, Button, Alert } from "react-bootstrap";

const PaymentForm = () => {
  const [priceData, setPriceData] = useState("");
  const [buyerData, setBuyerData] = useState("");
  const [productData, setProductData] = useState();
  const [sellerId, setSellerId] = useState("");
  const [sellerData, setSellerData] = useState("");
  const [sellerStripeAcct, setSellerStripeAcct] = useState({});
  const [stripePrice, setStripePrice] = useState("");
  const [auctionData, setAuctionData] = useState({});
  const location = useLocation();
  const [auctionId, setAuctionId] = useState(location.state.auctionId);

  useEffect(() => {
    setAuctionId(location.state.auctionId);

    const getData = async () => {
      try {
        const response2 = await axios.get(`/api/auctions/${+auctionId}`);
        const response3 = await axios.get("/api/users/current/user", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("TOKEN"),
          },
        });
        setAuctionData(response2.data.products);
        setPriceData(response2.data.currentBidPrice);
        setProductData(response2.data.products.name);
        setBuyerData(response3.data.username);
        setStripePrice(response2.data.products.stripePriceId);
        setSellerId(response2.data.userId);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getSeller = async () => {
      try {
        const response = await axios.get(`/api/users/${+sellerId}`);
        console.log(response.data);
        setSellerData(response.data);
        setSellerStripeAcct(response.data.stripeAccount);
      } catch (error) {
        console.log(error);
      }
    };
    getSeller();
  }, [sellerId]);

  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          price: stripePrice,
          quantity: 1,
          stripeAcct: sellerStripeAcct,
          auctionId,
        }),
      });

      const response1 = await axios.patch(
        `/api/auctions/winner/complete/${+auctionId}`
      );

      if (!response.ok) {
        const json = await response.json();
        throw json;
      }

      const { url } = await response.json();

      window.location = url;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="cards">
        <Card style={{ width: "80rem" }}>
          <Alert variant="warning">
            Congratulations! Please click the "Pay Now" button at the bottom of
            the page to enter your payment information.
          </Alert>
          <Card.Img
            variant="top"
            src={auctionData.imageUrl}
            alt={auctionData.name}
          />
          <Card.Body>
            <Card.Title>{auctionData.name}</Card.Title>
            <Card.Text>{auctionData.description}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              Seller Username:
              <Card.Link href={`/store/${sellerId}`}>
                {" "}
                {sellerData.username}
              </Card.Link>
            </ListGroup.Item>
            <ListGroup.Item>Buyer Username: {buyerData}</ListGroup.Item>
            <ListGroup.Item>Purchase Price: ${priceData}</ListGroup.Item>
          </ListGroup>
          <Button
            type="button"
            variant="btn btn-warning btn-lg"
            onClick={handleCheckout}
          >
            Pay Now
          </Button>
        </Card>
      </div>
    </>
  );
};

export default PaymentForm;
