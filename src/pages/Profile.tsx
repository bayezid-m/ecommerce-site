import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import '../styles/profile.scss'
import useAppDispatch from '../hooks/useAppDispatch'
import useAppSelector from '../hooks/useAppSelecter'
import { updateUser } from '../redux/reducers/userReducer';

const Profile = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const [doEdit, setDoEdit] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [avater, setAvater] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const { user, checkemail, loading, error } = useAppSelector(state => state.userReducer)
  const logout = () => {
    localStorage.setItem("token", "")
    navigate('/')
  }
  useEffect(() => {
    initialValue()

  }, [])
  const initialValue = () => {
    setName(user?.name)
    setEmail(user?.email)
    setPassword(user?.password)
    setRePassword(user?.password)
    setAvater(user?.avatar)
  }
  console.log(name);
  console.log(email);
  console.log(errorMessage);

  const handleSubmit = () => {
    if (name === '' || email === '' || password === '' || rePassword === '') {
      setErrorMessage("Please fill all input")
    }
    else if (password !== rePassword) {
      setErrorMessage("Please match both password field")
    }
    else {
      dispatch(updateUser({ userData: { name: name, email: email, password: password, role: 'customer', avatar: avater }, userId: user.id as number }));
      setDoEdit(false);
      //console.log(name);
    }
  }

  return (
    <div className='profile'>
      <h1 style={{ textAlign: 'center' }}>Your Profile</h1>
      {!doEdit ?
        <div>
          <h1>{user?.name}</h1>
          <h5>{user?.id}</h5>
          <h3>{user?.email}</h3>
          <p>{user?.password}</p>
          <p>{user?.role}</p>
          <img src={user?.avatar} className="poster" alt=" "></img>
          <div>
            <button onClick={e => setDoEdit(true)}>Update profile</button>
          </div>
        </div> :
        <div className='updateP'>
          <form >
            <div>
              <label>Name</label>
              <input type="text" className="name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <label>Email</label>
              <input type="email" className="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label>Password</label>
              <input type="password" className="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div>
              <label>Re enter password</label>
              <input type="password" className="password" value={rePassword} onChange={e => setRePassword(e.target.value)} />
            </div>
            <div>
              <button onClick={handleSubmit}>Update</button>
              <button onClick={e => setDoEdit(false)}>Cancel</button>
            </div>
          </form>
        </div>
      }
      {user?.role === 'admin' ?
        <div>
          <button>
            <Link to={'/newprdc'}>Add new product</Link>
          </button>
        </div> : ""
      }
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Profile