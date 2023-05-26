import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { GlobalState } from '../redux/store'
import { fetchAllProducts, fetchFromCategory, sortByPrice } from '../redux/reducers/productReducer'
import useAppDispatch from '../hooks/useAppDispatch'
import useAppSelecter from '../hooks/useAppSelecter'
import productsReducer from '../redux/reducers/productReducer'
import Card from '../components/CardView'
import { Box, Container, Grid } from '@mui/material'
import InputBar from '../components/InputBar'
import { Product } from '../types/Product'
import { fetchAllCategories } from '../redux/reducers/categoryReducer'
import useAppSelector from '../hooks/useAppSelecter'
const getFilteredList = (products: Product[], search: string) => {
    return products.filter(product => product.title.toLowerCase().includes(search.toLocaleLowerCase()))
}

const Home = () => {
    const dispatch = useAppDispatch()
    const [search, setSearch] = useState('')
    const { products, error, loading } = useAppSelecter(state => state.productsReducer)
    const filteredProducts = getFilteredList(products, search)
    const [category, setCategory] = useState(100)
    const [priceSort, setPriceSort] = useState<"Low"|"High">("Low")
    const { categories } = useAppSelector(state => state.categoryReducer);
    useEffect(() => {
        if (category === 100) {
            dispatch(fetchAllProducts())
            dispatch(fetchAllCategories())
            setPriceSort("Low")
        }
        else {    
            dispatch(fetchFromCategory({ categoryId: category }))
            setPriceSort("Low")
        }
        
    }, [category])
    const handleSort = () =>{
        dispatch(sortByPrice(priceSort))
        setPriceSort(priceSort==="Low"?"High": "Low")
    }
    console.log(category);
    return (
        <div>

            <Grid item lg={10} spacing={2} container sx={{ marginTop: 8, marginLeft: 15 }}>
                <Grid item lg={4} xs={8}>

                    <h4>Category</h4>
                    <select className='select' id="category" name="category" onChange={(e) => setCategory(parseInt(e.target.value))}>
                        <option value={100}>All</option>
                        {categories.map((cat) => (
                            <option value={cat.id} >{cat.name}</option>
                        ))}
                    </select>

                </Grid>
                <Grid item lg={4} xs={8}>

                    <h4>Sort price</h4>
                    <select  className='select' id="category" name="category" onChange={e=>handleSort()}>
                        <option value="">Low to High</option>
                        <option value="">Hight to Low</option>
                    </select>
                </Grid>
                <Grid item lg={4} xs={8} >
                    <form >
                        <input type="search" name="search" id="" value={search} onChange={e => setSearch(e.target.value)} />
                    </form>
                </Grid>
            </Grid>

            <Container >
                <Grid container spacing={1.5}>
                    {filteredProducts.map((product) => (
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


