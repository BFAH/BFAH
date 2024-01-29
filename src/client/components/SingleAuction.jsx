import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const SingleAuction = () => {
  const { id } = useParams();
  const [auctionData, setAuctionData] = useState({});
  const [productData, setProductData] = useState({});
  const [bidAmount, setBidAmount] = useState("");
   const [minimumBid, setMinimumBid] = useState(0);
   const [auctionEndTime, setAuctionEndTime] = useState("");
   const [currentBid, setCurrentBid] = useState("");
  const [timeRemaining, setTimeRemaining] = useState("");
  // const [flag, setFlag] = useState(false);
  // const [errorMsg, setErrorMsg] = useState("");
  const [sellerUsername, setSellerUsername] = useState({});
  const [username, setUsername] = useState(``);


  useEffect(() => {
    const getSingleAuction = async () => {
      try {
        const response = await axios.get(`/api/auctions/${+id}`);
        setAuctionData(response.data);
        setProductData(response.data.products);
        setSellerUsername(response.data.userId);
        setAuctionEndTime(response.data.bidEndTime);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    getSingleAuction();
  }, []);


  useEffect(() => {
    const getUserName = async () => {
      try {

        const response = await axios.get(`/api/users/store/${sellerUsername}`);
        setUsername(response.data.username);
      } catch (error) {
        console.error("Error Fetching Username", error);
      }
    };

    getUserName();
  }, [sellerUsername]);

  const handleEndAuction = () => {
    setTimeRemaining("AUCTION HAS ENDED!");
  }

  const timer = (auction) => {
    let secondsRemain = (auction/1000 + 50) - (Date.now() /1000) ;
    let daysRemain = Math.floor(secondsRemain / (60 * 60 * 24));
    let hoursRemain = Math.floor(
      (secondsRemain - daysRemain * (60 * 60 * 24)) / (60 * 60),
    );
    let minutesRemain = Math.floor(
      (secondsRemain - daysRemain * 60 * 60 * 24 - hoursRemain * 60 * 60) / 60,
    );
    let finalSeconds = Math.floor(
      secondsRemain -
        daysRemain * 60 * 60 * 24 -
        hoursRemain * 60 * 60 -
        minutesRemain * 60,
    );
    setTimeRemaining(`${daysRemain}d ${hoursRemain}h ${minutesRemain}m ${finalSeconds}s`);
    if(secondsRemain < 1 ){
      clearInterval(myinterval);
      handleEndAuction();
    }
  };
   const myinterval = setInterval(timer, 1000, Date.parse(auctionEndTime));
  
  const handleSubmitBid = async (event) => {
    event.preventDefault();
    if (!localStorage.getItem("TOKEN")) {
      alert("Must be logged in to place a bid!");
      setBidAmount("");
    } else {
      // Check if the bid amount meets the minimum bid limit
      if (bidAmount >= minimumBid) {
        try {
          const response = await axios.patch(
            `/api/auctions/${product.id}`,
            { currentBidPrice: bidAmount },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("TOKEN"),
              },
            }
          );
          console.log(response.data);
          setCurrentBid(response.data.currentBidPrice);
          setBidAmount("");
          setMinimumBid(Math.ceil(response.data.currentBidPrice * 1.05));
        } catch (error) {
          console.log(error);
        }
      } else {
        // Alert or display an error message for insufficient bid amount
        alert(`Bid amount must be at least ${minimumBid}`);
        setBidAmount("");
      }
    }
  };


  return (
    <>
      <div className="cards">
        <Card style={{ width: "80rem" }}>
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
            <ListGroup.Item>Current highest bid: ${auctionData.currentBidPrice}</ListGroup.Item>
            <ListGroup.Item>Time Left: {timeRemaining}</ListGroup.Item>
            <Form noValidate>
              <Form.Control
                type="number"
                id="bidAmount"
                name="bidAmount"
                placeholder="Enter your Bid here"
                
              />
              <Button variant="dark" >Bid</Button>
            </Form>
            <ListGroup.Item>Minimum Bid: $</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Card.Link href={`/${sellerUsername}`}>{username}</Card.Link>
            <Card.Link href="/">Home</Card.Link>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default SingleAuction;
