import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, ListGroup, Alert } from "react-bootstrap";

const Confirmation = () => {
	const [priceData, setPriceData] = useState('');
  const [buyerData, setBuyerData] = useState('');
	const [sellerId, setSellerId] = useState('');
	const [sellerData, setSellerData] = useState('');
	const [auctionData, setAuctionData] = useState({});

	useEffect(()=> {
    let auctionId = location.state.auctionId;
    console.log(auctionId);
  
    const getData = async() => {
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
    }
    getData();
  },[]);

	useEffect(()=>{
    const getSeller = async() => {
      try {
        const response = await axios.get(`/api/users/${+sellerId}`);
        console.log(response.data);
        setSellerData(response.data);
        setSellerStripeAcct(response.data.stripeAccount);
      } catch (error) {
        console.log(error)
      }
    }
    getSeller();
  },[sellerId]);

  return (
		<>
			<div className="cards">
        <Card style={{ width: "80rem" }}>
          <Alert variant="warning">
						Order Confirmed. Payment Processed. Thank You!
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
            <ListGroup.Item>Seller Username: 
              <Card.Link href={`/store/${sellerId}`}> {sellerData.username}</Card.Link>
            </ListGroup.Item>
            <ListGroup.Item>Buyer Username: {buyerData}</ListGroup.Item>
            <ListGroup.Item>Purchase Price: ${priceData}</ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
		</>
  );
};

export default Confirmation;