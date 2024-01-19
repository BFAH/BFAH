import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [auctionData, setAuctionData] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [minimumBid, setMinimumBid] = useState(0);
  const [auctionTime, setAuctionTime] = useState();
  const [currentBid, setCurrentBid] = useState('');
  const [timeRemaining, setTimeRemaining] = useState('');
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
        const response2 = await axios.get(`/api/auctions`);
        setAuctionData(response2.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchSingleProduct();
  }, []);


if(auctionData && !flag){
    
  for(let auction of auctionData) {
    const seconds = Date.parse(auction.bidEndTime);
    if(product.id === auction.productId){
        setAuctionTime(seconds);
        setCurrentBid(auction.currentBidPrice);
    }
  }
  setFlag(true);
}

const timer = () => {
  let secondsRemain = Math.floor((auctionTime - Date.parse(new Date()))/1000);
  let daysRemain = Math.floor(secondsRemain / (60 * 60 * 24));
  let hoursRemain = Math.floor((secondsRemain - daysRemain * (60 * 60 * 24))/ (60 * 60));
  let minutesRemain = Math.floor((secondsRemain - (daysRemain * 60 * 60 * 24)- (hoursRemain * 60 * 60)) / 60);
  let finalSeconds = Math.floor((secondsRemain - (daysRemain * 60 * 60 * 24)- (hoursRemain * 60 * 60) - (minutesRemain * 60)));
  setTimeRemaining(`${daysRemain}d ${hoursRemain}h ${minutesRemain}m ${finalSeconds}s`);
  setTimeout(timer,1000);
}
setTimeout(timer,1000);


  if (!product) {
    return <div>Loading...</div>;
  }

  const handleBidAmountChange = (event) => {
    const newBidAmount = parseFloat(event.target.value);
    setBidAmount(newBidAmount);
  };

  const handleSubmitBid = async(event) => {
    event.preventDefault();

    // Check if the bid amount meets the minimum bid limit
    if (bidAmount >= minimumBid) {
      try {
        const response = await axios.patch(`/api/auctions/${product.id}`,
        {currentBidPrice: bidAmount},
        {headers: {
          Authorization: "Bearer " + localStorage.getItem("TOKEN"),
        }});
        console.log(response.data);
        setCurrentBid(response.data.currentBidPrice);
        setBidAmount('');
      } catch (error) {
        console.log(error);
      }
    } else {
      // Alert or display an error message for insufficient bid amount
      alert(`Bid amount must be at least ${minimumBid}`);
    }
  };

  return (
    <div>
      <div>
        <h1>{product.name}</h1>
      </div>

      <div>
        <button onClick={() => navigate('/')}>Back to All Products</button>
      </div>

      <div>
        <img src={product.imageUrl} alt={product.name} />
      </div>

      <div style={{display:"flex", flexDirection:"column"}}>
        <h3>Description</h3>
        <div style={{width:"300px", alignSelf:"center"}}>{product.description}</div>
      </div>

      <div>
        <div>
          <p>Current Highest Bid: ${currentBid}</p>
        </div>
        <div>
          <p>Time Left: {timeRemaining}</p>
        </div>
      </div>

      <div>
        <form onSubmit={handleSubmitBid}>
          <label htmlFor="bidAmount">Bid Amount:</label>
          <input
            type="number"
            id="bidAmount"
            name="bidAmount"
            min={minimumBid}
            value={bidAmount}
            onChange={handleBidAmountChange}
            required
          />
          <button type="submit">BID</button>
        </form>
        <p>Minimum Bid: +5% Current Highest Bid</p>
      </div>
    </div>
  );
};

export default SingleProduct;