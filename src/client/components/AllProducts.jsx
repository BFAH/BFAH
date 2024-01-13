import React, {useState, useEffect } from "react";
import axios from "axios";
import FilterBar from "./FilterBar";

const AllProducts = () => {

    const [products, setProducts] = useState();
    const [filtered, setFiltered] = useState(null);


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
console.log(filtered);

    return (
        <div className="all-products">
            <h1>All Products</h1>
            <div className="main">
                <FilterBar products={products} setFiltered={setFiltered}/>
                {filtered ? 
                <div className="cards">
                    {filtered && filtered.map((product)=> {
                        return (
                            <div key={product.id} style={{height:"300px", width:"300px", border:"black solid 4px", margin:"20px", backgroundColor:"gold", color:"black"}}>
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <img src={product.imageUrl} style={{height:"100px", width:"100px"}}/>

                            </div> )})}
                </div>
                            :

                <div className="cards">
                    {products && products.map((product)=> {
                        return (
                            <div key={product.id} style={{height:"300px", width:"300px", border:"black solid 4px", margin:"20px", backgroundColor:"gold", color:"black"}}>
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <img src={product.imageUrl} style={{height:"100px", width:"100px"}}/>

                            </div>
                        )})}
                </div> }
            </div>
        </div>
    );
};

export default AllProducts;