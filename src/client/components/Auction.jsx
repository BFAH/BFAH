import React, { useEffect, useState } from "react";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const Auction = () => {
  const [newProductId, setNewProductId] = useState(null);
  const [newProductPrice, setNewProductPrice] = useState(null);
  const [count, setCount] = useState(null);
  const categoryId = count;
  // const currentBidPrice = newProductPrice;
  // const productId = newProductId;

  const [productData, setProductData] = useState({
    name: ``,
    description: ``,
    price: ``,
    imageUrl: ``,
  });

  const handleProduct = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  useEffect(()=>{
    if (newProductId !== null && newProductPrice !== null) {
      createAuction()
    }
  },[newProductId, newProductPrice])

  const createProduct = async () => {
    try {
      const result = await axios.post(
        `/api/products`,
        { ...productData, categoryId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("TOKEN"),
          },
        }
      );
      const product = result.data;
      setNewProductId(product.id);
      setNewProductPrice(product.price);
      console.log("new productId",newProductId);
      console.log("new productPrice",newProductPrice);
      console.log(product);
    } catch (error) {
      console.log(error);
    }
  };

  const createAuction = async () => {
    const bidStartTime = new Date().toISOString();
    const bidEndTime = new Date(Date.now() + 604800000).toISOString();
    const isActive = true;
  
    try {
      const result = await axios.post(
        `/api/auctions`,
        {
          bidStartTime,
          bidEndTime,
          isActive,
          currentBidPrice : newProductPrice,
          productId: newProductId,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("TOKEN"),
          },
        }
      );
      const newAuction = result.data;
      console.log(newAuction);
    } catch (error) {
      console.log(error);
    }
  };

 // console.log(newProductId);
  //console.log(newProductPrice);
  console.log(count);

  return (
    <>
      <Form noValidate>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>What is the name of your product?</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter Product Name"
              value={productData.name}
              onChange={handleProduct}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Please enter a description of your product:</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Enter Product Desc."
              value={productData.description}
              onChange={handleProduct}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label>How much are you selling this for?</Form.Label>
            <Form.Control
              type="text"
              name="price"
              placeholder="Enter Sell Price"
              value={productData.price}
              onChange={handleProduct}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom04">
            <Form.Label>Upload a Picture please:</Form.Label>
            <Form.Control
              type="text"
              name="imageUrl"
              placeholder="Upload a picture"
              value={productData.imageUrl}
              onChange={handleProduct}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
      </Form>
      <Dropdown>
        <Dropdown.Toggle variant="dark" id="dropdown-basic">
          Select Category
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            href="#/action-1"
            onClick={() => {
              setCount(count + 1);
            }}
          >
            Auto
          </Dropdown.Item>
          <Dropdown.Item
            href="#/action-2"
            onClick={() => {
              setCount(count + 2);
            }}
          >
            Books
          </Dropdown.Item>
          <Dropdown.Item
            href="#/action-3"
            onClick={() => {
              setCount(count + 3);
            }}
          >
            Clothes
          </Dropdown.Item>
          <Dropdown.Item
            href="#/action-4"
            onClick={() => {
              setCount(count + 4);
            }}
          >
            Collectibles
          </Dropdown.Item>
          <Dropdown.Item
            href="#/action-5"
            onClick={() => {
              setCount(count + 5);
            }}
          >
            Electronics
          </Dropdown.Item>
          <Dropdown.Item
            href="#/action-6"
            onClick={() => {
              setCount(count + 6);
            }}
          >
            Furniture
          </Dropdown.Item>
          <Dropdown.Item
            href="#/action-7"
            onClick={() => {
              setCount(count + 7);
            }}
          >
            Games
          </Dropdown.Item>
          <Dropdown.Item
            href="#/action-8"
            onClick={() => {
              setCount(count + 8);
            }}
          >
            Jewelry
          </Dropdown.Item>
          <Dropdown.Item
            href="#/action-9"
            onClick={() => {
              setCount(count + 9);
            }}
          >
            Kitchen
          </Dropdown.Item>
          <Dropdown.Item
            href="#/action-10"
            onClick={() => {
              setCount(count + 10);
            }}
          >
            Sports
          </Dropdown.Item>
          <Dropdown.Item
            href="#/action-11"
            onClick={() => {
              setCount(count + 11);
            }}
          >
            Toys
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Button
        variant="dark"
        onClick={() => {
          createProduct();
          // createAuction();
        }}
      >
        Post My Auction!
      </Button>
    </>
  );
};

export default Auction;
