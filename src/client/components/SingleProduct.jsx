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
    setFlag(false);
  }, [flag]);
console.log(product);
console.log(auctionData);


if(auctionData){
    
  for(let auction of auctionData) {
    const seconds = Date.parse(auction.bidEndTime) - 
    Date.parse(auction.bidStartTime);
    if(product.id === auction.productId){
        product.bidTime = new Date(seconds * 1000).toISOString().slice(11,19);
        product.currentBid = auction.currentBidPrice;

    }
  }
}
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
        setFlag(true);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
      console.log('Bid submitted:', bidAmount);
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

      {/* not yet dropdown */}
      <div>
        <h3>Description</h3>
        <p style={{width:"300px"}}>{product.description}</p>
      </div>

      {/* Current Bid and Time Left not yet functional*/}
      <div>
        <div>
          <p>Current Highest Bid: ${product.currentBid}</p>
        </div>
        <div>
          <p>Time Left: {product.bidTime}</p>
        </div>
      </div>

      {/* Bid Form not yet functional */}
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