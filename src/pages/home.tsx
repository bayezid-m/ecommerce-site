import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { GlobalState } from '../redux/store'
import { fetchAllProducts } from '../redux/reducers/productReducer'
import useAppDispatch from '../hooks/useAppDispatch'
import useAppSelecter from '../hooks/useAppSelecter'
import productsReducer from '../redux/reducers/productReducer'
import Card from '../components/CardView'
import { Container, Grid } from '@mui/material'
import InputBar from '../components/InputBar'

const Home = () => {
    const dispatch = useAppDispatch()
    const {products, error, loading} = useAppSelecter(state => state.productsReducer)
    useEffect(() => {
        dispatch(fetchAllProducts())
       
    }, [])
    //console.log(products);
    return (
        <div>
            <InputBar/>
            <Container >
                        <Grid container spacing={1.5}>
                            {products.map((product) => (
                                <Grid item xs={6} md={3} sm={6} lg={3} key={product.id}>
                                    <Card products={product} />
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
        </div>
    )
}

export default Home