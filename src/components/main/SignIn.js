import React, { useState } from 'react';
import { CssBaseline, Paper, Grid, TextField, Button, CircularProgress } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { StyledLR } from '../styles/styles';
import HeaderOne from '../header/HeaderOne';
import SignInLogo from '../images/SignInLogo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    username: '',
    password: ''
  });

  const [warning, setWarning] = useState({
    username: false,
    password: false
  });

  const [helper, setHelper] = useState({
    username: '',
    password: ''
  });

  const [token, setToken] = useState('');
  const [id, setId] = useState('');
  const [user, setUser] = useState('');

  localStorage.setItem('token', token);
  localStorage.setItem('id', id);
  localStorage.setItem('user', user);

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
    if (e.target.value.length > 0) {
      setWarning({
        ...warning,
        [e.target.name]: false
      });
      setHelper({
        ...helper,
        [e.target.name]: ''
      });
    } else {
      setWarning({
        ...warning,
        [e.target.name]: true
      });
      setHelper({
        ...helper,
        [e.target.name]: `${e.target.name.charAt(0).toUpperCase() +
          e.target.name.slice(1)} field is required`
      });
    }
  };

  const updateWarning = e => {
    if (e.target.value.length === 0) {
      setWarning({
        ...warning,
        [e.target.name]: true
      });

      setHelper({
        ...helper,
        [e.target.name]: `${e.target.name.charAt(0).toUpperCase() +
          e.target.name.slice(1)} field is required`
      });
    } else {
      setHelper({
        ...helper,
        [e.target.name]: ''
      });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios(
      'http://localhost:3008/api/login',
      {
        method: 'post',
        data: state
      },
      setLoading(true)
    )
      .then(function(res) {
        setTimeout(() => {
          setToken(res.data.token);
          setId(res.data.id);
          setUser(res.data.username);
          setLoading(false);
          window.location.href = '/main';
        }, 3000);
      })
      .catch(() => {
        setLoading(false);
        toast.error('Invalid User Account!', {
          position: toast.POSITION.TOP_CENTER
        });
      });
  };

  return (
    <StyledLR>
      <ToastContainer enableMultiContainer />
      <HeaderOne />
      <Grid container component="main" className="grid">
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className="gridImage" />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className="divContainer">
            <img src={SignInLogo} alt="signin" className="image" />
            <br />
            <form className="form" noValidate>
              <TextField
                label="Username"
                name="username"
                variant="outlined"
                onChange={handleChange}
                value={state.username}
                error={warning.username}
                onBlur={updateWarning}
                helperText={helper.username}
                className="textfield"
              />
              <TextField
                label="Password"
                type="password"
                name="password"
                variant="outlined"
                onChange={handleChange}
                value={state.password}
                error={warning.password}
                onBlur={updateWarning}
                helperText={helper.password}
                className="textfield"
              />
               {loading && (
                <CircularProgress size={70} style={{ color: green[500], margin: '50px' }} />
              )}

              {loading ? null : (
                <Button
                  variant="contained"
                  color="secondary"
                  className="btn"
                  onClick={handleSubmit}
                >
                  Log In
                </Button>
              )}
            </form>
          </div>
        </Grid>
      </Grid>
    </StyledLR>
  );
}
