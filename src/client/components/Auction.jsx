import React, { useEffect, useState } from "react";
import axios from "axios";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { Action } from "@remix-run/router";

const Auction = () => {
    const [productId, setProductId] = useState(null)
    const [count, setCount] = useState(null)
    const [productData, setProductData] = useState({
        name: ``,
        description: ``,
        price: ``,
        imageUrl: ``,
    });
    const [auctionData, setAuctionData] = useState({
        bidStartTime: ``,
        bidEndTime: ``,
        currentBidPrice: productData.price,
        productId
    });


    const handleProduct = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const result = await axios.post(`/api/products`, { ...productData, categoryId: count}, {
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
            <Dropdown  onSelect={(eventKey) => {setCount(+eventKey)}}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Select Category
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item eventKey="1" href="#/action-1">Auto</Dropdown.Item>
                    <Dropdown.Item eventKey="2" href="#/action-2">Books</Dropdown.Item>
                    <Dropdown.Item eventKey="3" href="#/action-3">Clothes</Dropdown.Item>
                    <Dropdown.Item eventKey="4" href="#/action-4">Collectibles</Dropdown.Item>
                    <Dropdown.Item eventKey="5" href="#/action-5">Electronics</Dropdown.Item>
                    <Dropdown.Item eventKey="6" href="#/action-6">Furniture</Dropdown.Item>
                    <Dropdown.Item eventKey="7" href="#/action-7">Games</Dropdown.Item>
                    <Dropdown.Item eventKey="8" href="#/action-8">Jewelry</Dropdown.Item>
                    <Dropdown.Item eventKey="9" href="#/action-9">Kitchen</Dropdown.Item>
                    <Dropdown.Item eventKey="10" href="#/action-10">Sports</Dropdown.Item>
                    <Dropdown.Item eventKey="11" href="#/action-11">Toys</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Button variant="dark" onClick={handleSubmit}>Post Auction</Button>
        </>
    );
};

export default Auction;