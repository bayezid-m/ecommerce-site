import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Select } from '@mui/material';
import { useEffect, useState } from 'react';
import useAppSelector from '../hooks/useAppSelecter';
import useAppDispatch from '../hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import { createSingleUser, fetchAllUser } from '../redux/reducers/userReducer';
import { User } from '../types/User';
import axios from 'axios';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [avater, setAvater] = useState('')
  const [checkEmail, setCheckEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  const { user, users } = useAppSelector(state => state.userReducer);
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllUser());
  }, [])
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const file = e.target.files?.[0]; // Get the selected file
    if (file) {
      const formData = new FormData();
      formData.append('file', file); // Append the file to the FormData
      imageUpload(formData);
    }
  }
  const imageUpload = (formData: FormData) => {
    axios
      .post('https://api.escuelajs.co/api/v1/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        setAvater(res.data.location);
        console.log(res.data.location);
       
      })
      .catch((err) => console.error(err));
  }
  console.log(avater);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let emailAvailable: User[] = users.filter(u => u.email === email);
    if (emailAvailable.length === 0) {
      if (name === '' || email === '' || password === '' || rePassword === '') {
        setErrorMessage('Please enter all input');
      }
      else if (email.includes('@') === false || email.includes('.') === false) {
        setErrorMessage('email format is wrong');
      }
      else if (password !== rePassword) {
        setErrorMessage('Password did not match')
      }
      else {
        dispatch(createSingleUser({ userData: { name: name, email: email, password: password, avatar: avater, role: 'customer' } }));
      }
    }
    else {
      alert(`This email is already registered !`)
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="Name"
                required
                fullWidth
                id="Name"
                label="Name"
                autoFocus
                onChange={e => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="repassword"
                label="Re-Password"
                type="password"
                id="repassword"
                onChange={e => setRePassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <label>Avater </label>
              <input
                required
                name="avater"
                type="file"
                id="avater"
                accept="image/png, image/gif, image/jpeg"
                onChange={handleImageUpload}
              />
            </Grid>
            {/* <Grid item xs={12}>     
            <Box>      
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Aveter</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            //value={catergory}
                            label="Aveter"                      
                        >
                            <MenuItem value={23} onClick={e=>setAvater("https://picsum.photos/640/640?r=1727")}>Avater 1</MenuItem>                    
                            <MenuItem value={20} onClick={e=>setAvater("https://picsum.photos/640/640?r=5047")}>Avater 2</MenuItem>
                            <MenuItem value={30} onClick={e=>setAvater("https://picsum.photos/640/640?r=2794")}>Avater 3</MenuItem>
                        </Select>
                    </FormControl>
                    </Box> 
            </Grid> */}
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}