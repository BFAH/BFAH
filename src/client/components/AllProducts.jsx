import React, {useState, useEffect } from "react";
import axios from "axios";

const AllProducts = () => {

    const [products, setProducts] = useState();

useEffect(() => {
    const fetchAllProducts = async () => {
        try {
            const response = await axios.get('/api/products');
            console.log(response)
            setProducts(response.data);
        } catch (error) {
            console.error('ERROR - Could Not Fetch All Products', error);
        }
    };

    fetchAllProducts();
}, []);


    return (
        <>
            <h1>All Products</h1>
        </>
    );
};

export default AllProducts;