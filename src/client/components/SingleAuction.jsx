import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const [sellerUsername, setSellerUsername] = useState({});
  const [buyerData, setBuyerData] = useState({});
  const [username, setUsername] = useState(``);
  const [payerFlag, setPayerFlag] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    const getSingleAuction = async () => {
      try {
        const response = await axios.get(`/api/auctions/${+id}`);
        setAuctionData(response.data);
        setProductData(response.data.products);
        setSellerUsername(response.data.userId);
        setAuctionEndTime(response.data.bidEndTime);
        setCurrentBid(response.data.currentBidPrice);
        setMinimumBid(Math.floor(response.data.currentBidPrice * 1.05));
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    getSingleAuction();
  }, []);

  useEffect(() => {
    const getBuyer = async () => {
      try {
        const result = await axios.get(`/api/users/current/user`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("TOKEN"),
          },
        });
        setBuyerData(result.data);
        setPayerFlag(buyerData.id === auctionData.currentBidUserId);
      } catch (error) {
        console.log(error);
      }
    };
    getBuyer();
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

  const timer = () => {
    let secondsRemain =
      Date.parse(auctionEndTime) / 1000 + 50 - Date.now() / 1000;
    let daysRemain = Math.floor(secondsRemain / (60 * 60 * 24));
    let hoursRemain = Math.floor(
      (secondsRemain - daysRemain * (60 * 60 * 24)) / (60 * 60)
    );
    let minutesRemain = Math.floor(
      (secondsRemain - daysRemain * 60 * 60 * 24 - hoursRemain * 60 * 60) / 60
    );
    let finalSeconds = Math.floor(
      secondsRemain -
        daysRemain * 60 * 60 * 24 -
        hoursRemain * 60 * 60 -
        minutesRemain * 60
    );
    if (secondsRemain > 0) {
      setTimeRemaining(
        `${daysRemain}d ${hoursRemain}h ${minutesRemain}m ${finalSeconds}s`
      );
    } else {
      setTimeRemaining("AUCTION ENDED");
      clearInterval(myinterval);
    }
  };
  let myinterval = setInterval(timer, 1000);

  const handleBidAmountChange = (event) => {
    if (timeRemaining !== "AUCTION ENDED") {
      const newBidAmount = parseFloat(event.target.value);
      setBidAmount(newBidAmount);
    }
  };

  const handleSubmitBid = async (event) => {
    event.preventDefault();
  
    if (!localStorage.getItem("TOKEN")) {
      alert("Must be logged in to place a bid!");
      setBidAmount("");
    } else {
      
      if (bidAmount >= minimumBid) {
        try {
          const response2 = await axios.post(`/api/stripe/update/price`, {
            bidPrice: +bidAmount,
            product: productData.stripeProductId,
          });
          const response = await axios.patch(
            `/api/auctions/${auctionData.id}`,
            { currentBidPrice: +bidAmount, stripePriceId: response2.data.id },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("TOKEN"),
              },
            }
          );
          setCurrentBid(response.data.currentBidPrice);
          setBidAmount("");
          setMinimumBid(Math.ceil(response.data.currentBidPrice * 1.05));
        } catch (error) {
          console.log(error);
        }
      } else {
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
            <ListGroup.Item>Current highest bid: ${currentBid}</ListGroup.Item>
            <ListGroup.Item>
              Time Left:{" "}
              {timeRemaining !== "AUCTION ENDED" ? (
                timeRemaining
              ) : payerFlag ? (
                <Button
                  onClick={() =>
                    navigation("/payment", { state: { auctionId: id } })
                  }
                >
                  YOU WON! Checkout
                </Button>
              ) : (
                <Button onClick={() => navigation("/")}>
                  YOU DID NOT WIN! Home
                </Button>
              )}
            </ListGroup.Item>
            <Form noValidate>
              <Form.Control
                type="number"
                id="bidAmount"
                name="bidAmount"
                placeholder="Enter your Bid here"
                value={bidAmount}
                onChange={handleBidAmountChange}
              />
              <Button variant="dark" onClick={handleSubmitBid}>
                Bid
              </Button>
            </Form>
            <ListGroup.Item>Minimum Bid: ${minimumBid}</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Card.Link href={`/store/${sellerUsername}`}>
              {" "}
              <Button variant="warning">{username}</Button>
            </Card.Link>
            <Card.Link href="/">
              {" "}
              <Button variant="success">Home</Button>
            </Card.Link>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default SingleAuction;
