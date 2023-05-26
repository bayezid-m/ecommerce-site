import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Grid } from '@mui/material';

import useAppSelector from '../hooks/useAppSelecter'
import useAppDispatch from '../hooks/useAppDispatch'
import { fetchAllCategories } from '../redux/reducers/categoryReducer';


const InputBar = (props: any) => {
    const dispatch = useAppDispatch()
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState<any>(0)
    const { categories } = useAppSelector(state => state.categoryReducer);
    useEffect(() => {
        dispatch(fetchAllCategories());
    }, [])
    const handleChange = (event: SelectChangeEvent) => {
        // setCategory(event.target.value as string);
    };
    const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
        //e.preventDefault()
        props.sendData(search)
    }
    console.log(category);
    return (
        <div>
            <Grid item lg={10} spacing={2} container sx={{ marginTop: 8, marginLeft: 15 }}>
                <Grid item lg={4} xs={8}>
                    <Box>
                    <h4>Category</h4>
                    <select id="category" name="category" onChange={(e) => setCategory(parseInt(e.target.value))}>
                        {categories.map((cat) => (
                            <option value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    </Box>
                </Grid>
                <Grid item lg={4} xs={8}>
                    <Box >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"

                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item lg={4} xs={8} >
                    <form onChange={handleSend}>
                        <input type="search" name="search" id="" value={search} onChange={e => setSearch(e.target.value)} />
                    </form>
                </Grid>
            </Grid>
        </div>
    )
}

export default InputBar