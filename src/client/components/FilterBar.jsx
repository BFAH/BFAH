import React, { useState } from "react";



const FilterBar = ({products}) => {
    const [category, setCategory] = useState('1');
    const [bidTime, setBidTime] = useState('');

    const filterCategories = async(e) => {
        e.preventDefault();
        console.log(category);
        console.log(products, category);
        const filteredCategoryResults = await products.filter(
            (product) => {
                return product.categoryId === +category;
            }
        );
        console.log(filteredCategoryResults);
    }

    return (
        <>
            <form className="filter-bar" onSubmit={filterCategories}>
                <label>Category
                        <select name="selectedCategory" defaultValue={category} onChange={(e)=>setCategory(e.target.value)}>
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
                </label>
                <label>Bid Time
                        <select name="selectedTime" defaultValue={bidTime}>
                            <option value="newest">Newest</option>
                            <option value="expiring">Soonest Expiring</option>
                        </select>
                </label>
                <button type="reset">Reset</button>
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default FilterBar;