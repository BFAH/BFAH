import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterBar from "./FilterBar";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Auction from "./Auction";
import PaymentForm from "./PaymentForm";

const AllProducts = () => {
  // const [products, setProducts] = useState();
  const [filtered, setFiltered] = useState(null);
  const [auctionData, setAuctionData] = useState();
  const [seller, setSeller] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get(`/api/auctions`);
        setAuctionData(response.data);
        console.log(auctionData);
      } catch (error) {
        console.error("ERROR - Could Not Fetch All Products", error);
      }
    };
    fetchAllProducts();
  }, []);
  console.log(auctionData);

  // if (auctionData) {
  //   for (let auction of auctionData) {
  //     auction[auction.productId - 1].bidTime = new Date(
  //       auction.bidEndTime
  //     ).toLocaleString();
  //     auction[auction.productId - 1].currentBid = auction.currentBidPrice;
  //     auction[auction.productId - 1].sellerId = auction.userId;
  //   }
  // }

  const handleBuyNow = (price1, sellerId) => {
    console.log(price1);
    if (confirm("Confirm Buy Now")) {
      return navigate("/payment", {
        state: { price: price1, seller: sellerId },
      });
    }
  };

  return (
    <>
      <div className="all-products">
      <FilterBar setFiltered={setFiltered} />
      {filtered ? (
          <div className="cards">
            {auctionData &&
              auctionData.map((auction) => {
                return (
                  <Card style={{ width: "20rem" }}>
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
                        Current highest bid: ${auctionData.currentBidPrice}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Time Left:{" "}
                        {new Date(auction.bidEndTime).toLocaleString()}
                      </ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                      <Card.Link href={`/${auction.productId}`}>
                        Look at my Auction!
                      </Card.Link>
                    </Card.Body>
                    <Button
                      variant="outline-secondary"
                      onClick={() => handleBuyNow()}
                    >
                      Buy Now
                    </Button>
                  </Card>
                );
              })}
          </div>
        
      ) : (
        
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
                        Current highest bid: ${auctionData.currentBidPrice}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Time Left:{" "}
                        {new Date(auction.bidEndTime).toLocaleString()}
                      </ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                      <Card.Link href={`/${auction.productId}`}>
                        Look at my Auction!
                      </Card.Link>
                    </Card.Body>
                    <Button
                      variant="outline-secondary"
                      onClick={() => handleBuyNow()}
                    >
                      Buy Now
                    </Button>
                  </Card>
                );
              })}
          </div>
      )}
        </div>
    </>
  );
};

export default AllProducts;

//    <div className="all-products">
//   <div className="main">
//     <FilterBar products={products} setFiltered={setFiltered} />
//     {filtered ? (
//       <div className="cards">
//         {filtered &&
//           filtered.map((product) => {
//             return (
//               <div key={product.id}>
//                 <div
//                   style={{
//                     position: "relative",
//                     top: "85%",
//                     left: "10px",
//                     zIndex: "2",
//                   }}
//                 >
//                   <button onClick={() => handleBuyNow(product.stripePriceId)}>
//                     Buy Now
//                   </button>
//                   :${product.price}
//                 </div>
//                 <Link to={`/${product.id}`} style={{ textDecoration: "none" }}>
//                   <div
//                     style={{
//                       height: "380px",
//                       width: "300px",
//                       border: "black solid 4px",
//                       margin: "20px",
//                       backgroundColor: "#def2f1",
//                       color: "black",
//                     }}
//                   >
//                     <h3>{product.name}</h3>
//                     <p>{product.description}</p>
//                     <img
//                       src={product.imageUrl}
//                       style={{ height: "100px", width: "100px" }}
//                     />
//                     <h4>Current Bid: ${product.currentBid}</h4>
//                     <h5>Bid End: {product.bidTime}</h5>
//                   </div>
//                 </Link>
//               </div>
//             );
//           })}
//       </div>
//     ) : (
//       <div className="cards">
//         {products &&
//           products.map((product) => {
//             return (
//               <div key={product.id}>
//                 <div
//                   style={{
//                     position: "relative",
//                     top: "85%",
//                     left: "10px",
//                     zIndex: "2",
//                   }}
//                 >
//                   <button
//                     onClick={() =>
//                       handleBuyNow(product.stripePriceId, product.sellerId)
//                     }
//                   >
//                     Buy Now
//                   </button>
//                   :${product.price}
//                 </div>
//                 <Link to={`/${product.id}`} style={{ textDecoration: "none" }}>
//                   <div
//                     style={{
//                       height: "380px",
//                       width: "300px",
//                       border: "black solid 4px",
//                       margin: "20px",
//                       backgroundColor: "#def2f1",
//                       color: "black",
//                     }}
//                   >
//                     <h3>{product.name}</h3>
//                     <p>{product.description}</p>
//                     <img
//                       src={product.imageUrl}
//                       style={{ height: "100px", width: "100px" }}
//                     />

//                     <h4>Current Bid: ${product.currentBid}</h4>
//                     <h5>Bid End: {product.bidTime}</h5>
//                   </div>
//                 </Link>
//               </div>
//             );
//           })}
//       </div>
//     )}
//   </div>
// </div>;
