import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, ListGroup, Alert } from "react-bootstrap";

const Confirmation = () => {
  const [priceData, setPriceData] = useState("");
  const [buyerData, setBuyerData] = useState("");
  const [productData, setProductData] = useState({});
  const [sellerId, setSellerId] = useState("");
  const [sellerData, setSellerData] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const response2 = await axios.get(`/api/auctions/${+id}`);
        const response3 = await axios.get("/api/users/current/user", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("TOKEN"),
          },
        });
        setPriceData(response2.data.currentBidPrice);
        setProductData(response2.data.products);
        setBuyerData(response3.data.username);
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
        setSellerData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSeller();
  }, [sellerId]);

  return (
    <>
      <div className="cards">
        <Card style={{ width: "80rem" }}>
          <Alert variant="warning">
            Order Confirmed. Payment Processed. Thank You!
          </Alert>
          <Card.Img
            variant="top"
            src={productData.imageUrl}
            alt={productData.name}
          />
          <Card.Body>
            <Card.Title>{productData.name}</Card.Title>
            <Card.Text>{productData.description}</Card.Text>
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
        </Card>
      </div>
    </>
  );
};

export default Confirmation;
