import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dropdown, Button, Col, Form, Row } from "react-bootstrap";

const Auction = () => {
  const [newProductId, setNewProductId] = useState(null);
  const [newProductPrice, setNewProductPrice] = useState(null);
  const [count, setCount] = useState(null);
  const categoryId = count;
  const [productData, setProductData] = useState({
    name: ``,
    description: ``,
    price: ``,
    imageUrl: ``,
  });

  const handleProduct = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (newProductId !== null && newProductPrice !== null) {
      createAuction();
    }
  }, [newProductId, newProductPrice]);

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
    } catch (error) {
      console.log(error);
    }
  };

  const createAuction = async () => {
    const bidStartTime = new Date().toISOString();
    const bidEndTime = new Date(Date.now() + 300000).toISOString();
    const isActive = true;

    try {
      const result = await axios.post(
        `/api/auctions`,
        {
          bidStartTime,
          bidEndTime,
          isActive,
          currentBidPrice: newProductPrice,
          productId: newProductId,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("TOKEN"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="all-products">
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>What is your product's name?</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter Your Product's Name"
                value={productData.name}
                onChange={handleProduct}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>
                Please enter a description of your product:
              </Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Enter Your Product's Desc."
                value={productData.description}
                onChange={handleProduct}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>How much are you selling this for?</Form.Label>
              <Form.Control
                type="text"
                name="price"
                placeholder="Enter Your Price"
                value={productData.price}
                onChange={handleProduct}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Please upload a picture for us:</Form.Label>
              <Form.Control
                type="text"
                name="imageUrl"
                placeholder="Please enter an image URL"
                value={productData.imageUrl}
                onChange={handleProduct}
              />
            </Form.Group>
            <Dropdown style={{ marginTop: "10px" }}>
              <Button variant="warning">
                What category does this belong to?
              </Button>
              <Dropdown.Toggle
                split
                variant="warning"
                id="dropdown-split-basic"
              />
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
          </Row>
          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check type="checkbox" label="Finalize Me" />
          </Form.Group>

          <Button
            variant="warning"
            onClick={() => {
              createProduct();
              createAuction();
            }}
          >
            I'm ready to make money!
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Auction;
