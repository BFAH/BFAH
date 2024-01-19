import React, { useState } from "react";

const FilterBar = ({ products, setFiltered }) => {
  const [category, setCategory] = useState(null);
  const [bidTime, setBidTime] = useState("");
  const [priceRange, setPriceRange] = useState("99999999999");

  const filterCategories = async (e) => {
    e.preventDefault();
    console.log(products, category);
    const filteredCategoryResults = await products.filter((product) => {
      return (
        (category ? category === product.categoryId.toString() : true) &&
        product.price < +priceRange
      );
    });
    setFiltered(filteredCategoryResults);
  };

  return (
    <>
      <form className="filter-bar" onSubmit={filterCategories}>
        <label>Category</label>
        <select
          name="selectedCategory"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value={null}>All</option>
          <option value="1">Auto</option>
          <option value="2">Books</option>
          <option value="3">Clothes</option>
          <option value="4">Collectables</option>
          <option value="5">Electronics</option>
          <option value="6">Furniture</option>
          <option value="7">Games</option>
          <option value="8">Jewelry</option>
          <option value="9">Kitchen</option>
          <option value="10">Sports</option>
          <option value="11">Toys</option>
        </select>
        <label>Bid Time</label>
        <select name="selectedTime">
          <option value="newest">Newest</option>
          <option value="expiring">Soonest Expiring</option>
        </select>
        <label>Price Range</label>
        <select
          name="selectedPrice"
          onChange={(e) => {
            setPriceRange(e.target.value);
          }}
        >
          <option value="999999999">All</option>
          <option value="300">less 300</option>
          <option value="600"> less 600</option>
          <option value="2000">less 2000</option>
        </select>
        <button
          type="reset"
          onClick={() => {
            setFiltered(null);
            setCategory(null);
            setPriceRange("99999999999");
          }}
        >
          Reset
        </button>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default FilterBar;
