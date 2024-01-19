import React, {useState, useEffect } from "react";
import axios from "axios";
import FilterBar from "./FilterBar";
import { Link } from "react-router-dom";
import Auction from "./Auction";

const AllProducts = () => {

    const [products, setProducts] = useState();
    const [filtered, setFiltered] = useState(null);
    const [auctionData, setAuctionData] = useState();



useEffect(() => {
    const fetchAllProducts = async () => {
        try {
            const response = await axios.get('/api/products');
            setProducts(response.data);
            const response2 = await axios.get(`/api/auctions`);
            setAuctionData(response2.data);
        } catch (error) {
            console.error('ERROR - Could Not Fetch All Products', error);
        }
    };
fetchAllProducts();

}, []);
if(auctionData){
    
    for(let auction of auctionData) {
        products[auction.productId-1].bidTime = new Date(auction.bidEndTime).toLocaleString();
        products[auction.productId-1].currentBid = auction.currentBidPrice;
    }
}
    return (
        <div className="all-products">
            <h1>All Products</h1>
            <div className="main">
                <FilterBar products={products} setFiltered={setFiltered}/>
                {filtered ? 
                <div className="cards">
                    {filtered && filtered.map((product)=> {
                        return (
                            
                            <div key={product.id} >
                                <Link to={`/${product.id}`} style={{textDecoration:"none"}}>
                                <div style={{height:"380px", width:"300px", border:"black solid 4px", margin:"20px", backgroundColor:"#def2f1", color:"black"}}>
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <img src={product.imageUrl} style={{height:"100px", width:"100px"}}/>
                                <h4>Buy Now: ${product.price}</h4>
                                <h4>Current Bid: ${product.currentBid}</h4>
                                <h5>Bid End: {product.bidTime}</h5>
                                </div>
                                </Link>
                            </div>
                                 )})}
                </div>
                            :

                <div className="cards">
                    {products && products.map((product)=> {
                        return (
                           
                            <div key={product.id} >
                                <Link to={`/${product.id}`} style={{textDecoration:"none"}}>
                                <div style={{height:"380px", width:"300px", border:"black solid 4px", margin:"20px", backgroundColor:"#def2f1", color:"black"}}>
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <img src={product.imageUrl} style={{height:"100px", width:"100px"}}/>
                                <h4>Buy Now: ${product.price}</h4>
                                <h4>Current Bid: ${product.currentBid}</h4>
                                <h5>Bid End: {product.bidTime}</h5>
                                </div>
                                </Link>
                                
                            </div>
                            
                        )})}
                </div> }
            </div>
        </div>
    );
};

export default AllProducts;