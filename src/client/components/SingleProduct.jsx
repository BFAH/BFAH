import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [auctionData, setAuctionData] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [minimumBid, setMinimumBid] = useState(0);
  const [auctionTime, setAuctionTime] = useState();
  const [currentBid, setCurrentBid] = useState("");
  const [timeRemaining, setTimeRemaining] = useState("");
  const [flag, setFlag] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [users, setUsers] = useState("");

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
        const response2 = await axios.get(`/api/auctions`);
        setAuctionData(response2.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchSingleProduct();
  }, []);

  if (auctionData && !flag) {
    for (let auction of auctionData) {
      const seconds = Date.parse(auction.bidEndTime);
      if (product.id === auction.productId) {
        setAuctionTime(seconds);
        setCurrentBid(auction.currentBidPrice);
        setMinimumBid(auction.currentBidPrice * 1.05);
      }
    }
    setFlag(true);
  }

  const getUserName = (userId, users) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.username : "Unknown User";
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("ERROR - Could Not Fetch User", error);
      }
    };

    fetchUsers();
  }, []);

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

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleBidAmountChange = (event) => {
    const newBidAmount = parseFloat(event.target.value);
    setBidAmount(newBidAmount);
  };

  const handleSubmitBid = async (event) => {
    event.preventDefault();
    if (!localStorage.getItem("TOKEN")) {
      setErrorMsg("Must be logged in to place a bid!");
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
      <h1>{product.name}</h1>
      <Button onClick={() => navigate("/")}>Back to All Products</Button>
      <br />
      <img src={product.imageUrl} alt={product.name} />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h3>Description</h3>
        <div style={{ width: "300px", alignSelf: "center" }}>
          {product.description}
        </div>
      </div>
      <br />
      <h6>Seller: {getUserName(product.userId, users)}</h6>
      <p>Current Highest Bid: ${currentBid}</p>
      <p>Time Left: {timeRemaining}</p>
      <form onSubmit={handleSubmitBid}>
        <label htmlFor="bidAmount"></label>
        <input
          type="number"
          id="bidAmount"
          name="bidAmount"
          value={bidAmount}
          onChange={handleBidAmountChange}
          required
          placeholder="Bid Amount"
        />
        <Button type="submit">BID</Button>
      </form>
      <p>Minimum Bid: ${minimumBid}</p>
      <p>{errorMsg}</p>
    </>
  );
};

export default SingleProduct;
