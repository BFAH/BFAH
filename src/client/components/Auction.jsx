import React, { useEffect, useState } from "react";
import axios from "axios";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

const Auction = () => {
    const [productId, setProductId] = useState(null)
    const [count, setCount] = useState(null)
    const [productData, setProductData] = useState({
        name: ``,
        description: ``,
        price: ``,
        imageUrl: ``,
        categoryId: count
    });
    const [auctionData, setAuctionData] = useState({
        bidStartTime: ``,
        bidEndTime: ``,
        currentBidPrice: productData.price,
        productId
    });



    const handleProduct = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const result = await axios.post(`/api/products`, productData, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("TOKEN"),
                },
            });
            const product = result.data
            console.log(product)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <form>
                <label>
                    What is the name of your product?
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Product Name"
                        value={productData.name}
                        onChange={handleProduct}
                    />
                </label>
                <label>
                    Please enter a description of your product:
                    <input
                        type="text"
                        name="description"
                        placeholder="Enter Product Description"
                        value={productData.description}
                        onChange={handleProduct}
                    />
                </label>
                <label>
                    How much are you selling this for?
                    <input
                        type="text"
                        name="price"
                        placeholder="Enter Sell Price"
                        value={productData.price}
                        onChange={handleProduct}
                    />
                </label>
                <label>
                    Upload a Picture please:
                    <input
                        type="text"
                        name="imageUrl"
                        placeholder="Upload a picture"
                        value={productData.imageUrl}
                        onChange={handleProduct}
                    />
                </label>
            </form>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Select Category
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1" onClick={setCount + 1}>Auto</Dropdown.Item>
                    <Dropdown.Item href="#/action-2" onClick={setCount + 2}>Books</Dropdown.Item>
                    <Dropdown.Item href="#/action-3" onClick={setCount + 3}>Clothes</Dropdown.Item>
                    <Dropdown.Item href="#/action-4" onClick={setCount + 4}>Collectibles</Dropdown.Item>
                    <Dropdown.Item href="#/action-5" onClick={setCount + 5}>Electronics</Dropdown.Item>
                    <Dropdown.Item href="#/action-6" onClick={setCount + 6}>Furniture</Dropdown.Item>
                    <Dropdown.Item href="#/action-7" onClick={setCount + 7}>Games</Dropdown.Item>
                    <Dropdown.Item href="#/action-8" onClick={setCount + 8}>Jewelry</Dropdown.Item>
                    <Dropdown.Item href="#/action-9" onClick={setCount + 9}>Kitchen</Dropdown.Item>
                    <Dropdown.Item href="#/action-10" onClick={setCount + 10}>Sports</Dropdown.Item>
                    <Dropdown.Item href="#/action-11" onClick={setCount + 11}>Toys</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Button variant="dark" onClick={handleSubmit}>Post Auction</Button>
        </>
    );
};

export default Auction;