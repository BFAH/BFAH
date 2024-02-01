import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterBar from "./FilterBar";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Auction from "./Auction";
import PaymentForm from "./PaymentForm";

const AllAuctions = () => {
  // const [products, setProducts] = useState();
  const [filtered, setFiltered] = useState(null);
  const [auctionData, setAuctionData] = useState();
  const [seller, setSeller] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getAllAuctions = async () => {
      try {
        const response = await axios.get(`/api/auctions`);
        setAuctionData(response.data);
        console.log(auctionData);
      } catch (error) {
        console.error("ERROR - Could Not Fetch All Products", error);
      }
    };
    getAllAuctions();
  }, []);
  console.log(auctionData);

  const handleBuyNow = (id) => {
    if (confirm("Confirm Buy Now")) {
      return navigate("/payment", {
        state: { auctionId: id },
      });
    }
  };

  return (
    <>
      <FilterBar auctionData = {auctionData} setFiltered={setFiltered} />
      {filtered ? (
          <div className="cards">
            {filtered &&
              filtered.map((auction) => {
                return (
                  <Card key={auction.id} style={{ width: "25rem" }}>
                    <Card.Img
                      variant="top"
                      style={{height: "299px", width: "398px"}}
                      src={auction.products.imageUrl}
                      alt={auction.products.name}
                    />
                    <Card.Body>
                      <Card.Title>{auction.products.name}</Card.Title>
                      <Card.Text>{auction.products.description}</Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item>
                        Current highest bid: ${auction.currentBidPrice}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Auction end date:{" "}
                        {new Date(auction.bidEndTime).toLocaleString()}
                      </ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                      <Card.Link href={`/${auction.id}`}>
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
                  <Card key={auction.id} style={{ width: "25rem" }}>
                    <Card.Img
                      variant="top"
                      style={{height: "299px", width: "398px"}}
                      src={auction.products.imageUrl}
                      alt={auction.products.name}
                    />
                    <Card.Body>
                      <Card.Title>{auction.products.name}</Card.Title>
                      <Card.Text>{auction.products.description}</Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item>
                        Current highest bid: ${auction.currentBidPrice}
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
                      onClick={() => handleBuyNow(auction.id)}
                    >
                      Buy Now
                    </Button>
                  </Card>
                );
              })}
          </div>
      )}
    </>
  );
};

export default AllAuctions;

