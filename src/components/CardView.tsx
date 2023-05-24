import React from 'react'
import { Button, Card, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from '../types/Product';
import { Link as MuiLink } from "@mui/material";

interface Props {
    products: Product;
  }

const CardView = (props: Props) => {
  return (
   
   <Card className='card'> 
    <Link to={`info/${props.products.id}`} ><img src={props.products.images[0]} className="poster" alt=" "></img>  </Link>
    {(props.products.id)-1}: {props.products.title} <br/>
    Price: {props.products.price} <br/>
    <button>Add to cart</button>
   </Card>
   
  )
}

export default CardView