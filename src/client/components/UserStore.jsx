import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Form, ListGroup, Card } from "react-bootstrap";

const UserStore = () => {
  const { id } = useParams();
  const [auctionData, setAuctionData] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [flag, setFlag] = useState(false);
  const [currentBid, setCurrentBid] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [auctionTime, setAuctionTime] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const [minimumBid, setMinimumBid] = useState(0);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const response = await axios.get(`/api/auctions/seller/store/${id}`);
        setAuctionData(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchSingleProduct();
  }, []);

  if (auctionData && !flag) {
    for (let auction of auctionData) {
      const seconds = Date.parse(auction.bidEndTime);
      if (auction.isActive === true) {
        setAuctionTime(seconds);
        setCurrentBid(auction.currentBidPrice);
        setMinimumBid(auction.currentBidPrice * 1.05);
      }
    }
    setFlag(true);
  }

  const timer = () => {
    let secondsRemain = Math.floor(
      (auctionTime - Date.parse(new Date())) / 1000
    );
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
    setTimeRemaining(
      `${daysRemain}d ${hoursRemain}h ${minutesRemain}m ${finalSeconds}s`
    );
    setTimeout(timer, 1000);
  };
  setTimeout(timer, 1000);

  const handleBidAmountChange = (event) => {
    const newBidAmount = parseFloat(event.target.value);
    setBidAmount(newBidAmount);
  };

  const handleSubmitBid = async (event) => {
    event.preventDefault();
    if (!localStorage.getItem("TOKEN")) {
      setErrorMsg("Must be logged in to place a bid!");
    } else {
      if (bidAmount >= minimumBid) {
        try {
          const response = await axios.patch(
            `/api/auctions/${auctionData.id}`,
            { currentBidPrice: bidAmount },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("TOKEN"),
              },
            }
          );
          setCurrentBid(response.data.currentBidPrice);
          setBidAmount("");
          setMinimumBid(Math.ceil(response.data.currentBidPrice * 1.05));
          window.location.reload();
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
        {auctionData &&
          auctionData.map((auction) => {
            return (
              <Card style={{ width: "30rem" }}>
                <Card.Img
                  variant="top"
                  src={auction.products.imageUrl}
                  alt={auction.products.name}
                />
                <Card.Body>
                  <Card.Title>{auction.products.name}</Card.Title>
                  <Card.Text>{auction.products.description}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>
                    Current highest bid: ${currentBid}
                  </ListGroup.Item>
                  <ListGroup.Item>Time Left: {timeRemaining}</ListGroup.Item>
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
                  <Card.Link href="/">
                    {" "}
                    <Button variant="success">Home</Button>
                  </Card.Link>
                </Card.Body>
              </Card>
            );
          })}
      </div>
    </>
  );
};

export default UserStore;
