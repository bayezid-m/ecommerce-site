import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter, } from 'react-router-dom'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux'
import './App.css';
import './styles/style.scss'
import './styles/cardView.scss'
import './styles/updateProfile.scss'
import './styles/newProduct.scss'
import NavBar from './components/NavBar';
import Home from './pages/home';
import { fetchAllProducts } from './redux/reducers/productReducer';
import ProductInfo from './pages/ProductInfo';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import NewProduct from './pages/NewProduct';
import UpdateProduct from './pages/UpdateProduct';

function App() {
  const [isDark, setIsDark] = useState(false)

  const darkTheme = createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: {
        main: "#311b92",
      },
      secondary: {
        main: "#424242",
      },
    }
  })
  const lightTheme = createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: {
        main: "#311b92",
      },
      secondary: {
        main: "#fafafa",
      },
    }
  })

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Paper sx={{ maxHeight: "100%", minHeight: 900, backgroundColor: "secondary.main" }}>
        <BrowserRouter>
          <NavBar check={isDark} change={() => setIsDark(!isDark)}/>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/info/:id' element={<ProductInfo />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/newprdc' element={<NewProduct/>}/>
            <Route path='/updatep/:id' element={<UpdateProduct />}/>
          </Routes>
        </BrowserRouter>
      </Paper>

    </ThemeProvider>

  );
}

export default App;
