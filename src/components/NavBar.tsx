
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import { useNavigate } from 'react-router-dom';

import Login from '../pages/Login';
import { Link } from 'react-router-dom';
import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelecter';
import { useEffect } from 'react';
import { authenticate } from '../redux/reducers/userReducer';


export default function NavBar({ check, change }: { check: any; change: any }) {
    const dispatch = useAppDispatch()
    const { user, checkemail, loading, error } = useAppSelector(state => state.userReducer)
    const token: any = localStorage.getItem("token" || "")
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(authenticate(token))
    }, [])
    const logout=()=>{
        localStorage.setItem("token", "")
        navigate('/')
    }
    return (
        <Box sx={{ flexGrow: 1, position: 'fixed', top: 0, width: '100%' }}>
            <AppBar position="static" sx={{ backgroundColor: "primary.main" }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to='/' className='name'>AliHyva</Link>
                    </Typography>
                    {token ?
                        <div style={{display:'flex', gap: 10}}>
                            <Link to='profile'><p style={{ color: 'white' }}>{user?.name}</p></Link>
                            <button onClick={logout}>Logout</button>
                        </div>
                        :
                        <div style={{display:'flex', gap: 10}}>
                            <Link to="/login"><p style={{ color: 'white' }}>Login</p></Link>
                            <Link to="/register"><p style={{ color: 'white' }}>Signup</p></Link>
                        </div>

                    }
                    <Switch
                        checked={check}
                        onChange={change}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Toolbar>
            </AppBar>
        </Box>
    );
}