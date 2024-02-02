import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const FilterBar = ( auctions ) => {
  const [category, setCategory] = useState(null);
  const [bidTime, setBidTime] = useState("");
  const [priceRange, setPriceRange] = useState("99999999999");

  const filterCategories = async (e) => {
    e.preventDefault();
    const auctionArray = auctions.auctionData;
    const filteredCategoryResults = await auctionArray.filter((auction) => {
      return (
        (category ? category === auction.products.categoryId.toString() : true) &&
        auction.currentBidPrice < +priceRange
      );
    });
    if(bidTime === "newest"){
    const sortedArray = filteredCategoryResults.sort((a,b) => {
      let dateA = Date.parse(a.bidEndTime);
      let dateB = Date.parse(b.bidEndTime);
      return dateB - dateA;
    });
    }
    else{
      const sortedArray = filteredCategoryResults.sort((a,b) => {
        let dateA = Date.parse(a.bidEndTime);
        let dateB = Date.parse(b.bidEndTime);
        return dateA - dateB;
      });
    }
    auctions.setFiltered(filteredCategoryResults);
  };

  return (
    <>
      <Form.Select
        name="selectedCategory"
        onChange={(e) => setCategory(e.target.value)}
        style={{textAlign: "center"}}
      >
        <option value = "0">Please Select a category you would like to find.</option>
        <option value="1">Auto</option>
        <option value="2">Books</option>
        <option value="3">Clothes</option>
        <option value="4">Collectibles</option>
        <option value="5">Electronics</option>
        <option value="6">Furniture</option>
        <option value="7">Games</option>
        <option value="8">Jewelry</option>
        <option value="9">Kitchen</option>
        <option value="10">Sports</option>
        <option value="11">Toys</option>
      </Form.Select>
      <Form.Select aria-label="Default select example" 
      name="selectedTime"
      style={{textAlign: "center"}}
      onChange={(e)=> {
        setBidTime(e.target.value);
      }}>
        <option>Auction bid Times</option>
        <option value="newest">Newest</option>
        <option value="expiring">Expiring soon</option>
      </Form.Select>
      <Form.Select
        aria-label="Default select example"
        name="selectedPrice"
        style={{textAlign: "center"}}
        onChange={(e) => {
          setPriceRange(e.target.value);
        }}
      >
        <option>Price Range</option>
        <option value="999999999">All</option>
        <option value="300">less than 300</option>
        <option value="600">less than 600</option>
        <option value="2000">less than 20,00</option>
        <option value="10000">less than 10,000</option>
        <option value="50000">less than 50,000</option>
      </Form.Select>
      <div className="d-grid gap-2">
        <Button
          variant="warning"
          size="lg"
          type="reset"
          onClick={(e) => {
            auctions.setFiltered(null);
            setCategory(null);
            setPriceRange("99999999999");
            window.location.reload();
          }}
        >
          Reset
        </Button>
        <Button variant="warning" size="lg" onClick={filterCategories}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default FilterBar;
