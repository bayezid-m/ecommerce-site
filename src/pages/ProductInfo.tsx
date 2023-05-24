import React,{ useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

import useAppDispatch from '../hooks/useAppDispatch'
import useAppSelecter from '../hooks/useAppSelecter'
import { Product } from '../types/Product';
const ProductInfo = () => {
    const { id } = useParams();
    const [productsInfo, setProductInfo] = useState<Product>()

    useEffect(()=>{
        axios
            .get<Product>(`https://api.escuelajs.co/api/v1/products/${id}`)
            .then((response: AxiosResponse) => setProductInfo(response.data))
           
    }, [id])
    return (
        <div className="pinfo">
            <div >
            <img src={productsInfo?.images[0]} className="poster" alt=" "></img>   
            </div>
            <div>
            <h1>{productsInfo?.title}</h1>
            <h3>Price: {productsInfo?.price}</h3>
            <p>Description: {productsInfo?.description}</p>
            <button>Add to Cart</button>
            </div>
        </div>
    )
}

export default ProductInfo