import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [minimumBid, setMinimumBid] = useState(0);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);

        // Set the minimum bid to 5% more than the current bid
        setMinimumBid(response.data.currentBidPrice * 1.05);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchSingleProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleBidAmountChange = (event) => {
    const newBidAmount = parseFloat(event.target.value);
    setBidAmount(newBidAmount);
  };

  const handleSubmitBid = (event) => {
    event.preventDefault();

    // Check if the bid amount meets the minimum bid limit
    if (bidAmount >= minimumBid) {
      // Your logic to submit the bid
      console.log('Bid submitted:', bidAmount);
    } else {
      // Alert or display an error message for insufficient bid amount
      alert(`Bid amount must be at least ${minimumBid}`);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <div>
        <h1>Navbar</h1>
      </div>

      {/* Back to All Products button */}
      <div>
        <button onClick={() => navigate('/')}>Back to All Products</button>
      </div>

      {/* Product Image */}
      <div>
        <img src={product.imageUrl} alt={product.name} />
      </div>

      {/* not yet dropdown */}
      <div>
        <h3>Description</h3>
        <p>{product.description}</p>
      </div>

      {/* Current Bid and Time Left not yet functional*/}
      <div>
        <div>
          <p>Current Highest Bid: ${product.currentBidPrice}</p>
        </div>
        <div>
          <p>Time Left: 2 days</p>
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