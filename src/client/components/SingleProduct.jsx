import React from "react";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
    const {id} = useParams();
    return (
        <>
            <h1>Details Page</h1>
            <h1>{id}</h1>
        </>
    );
};

export default SingleProduct;