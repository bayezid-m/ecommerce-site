import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter, } from 'react-router-dom'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux'
import './App.css';
import './styles/style.scss'
import './styles/cardView.scss'
import NavBar from './components/NavBar';
import Home from './pages/home';
import { fetchAllProducts } from './redux/reducers/productReducer';
import ProductInfo from './pages/ProductInfo';

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
      <Paper sx={{ height: "100%", backgroundColor: "secondary.main" }}>
        <BrowserRouter>
          <NavBar check={isDark} change={() => setIsDark(!isDark)}/>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/info/:id' element={<ProductInfo />}/>
          </Routes>
        </BrowserRouter>
      </Paper>

    </ThemeProvider>

  );
}

export default App;
