import React, { useState } from 'react';
import { CssBaseline, Paper, Grid, TextField, Button, CircularProgress, Fab } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import { StyledLR } from '../styles/styles';
import HeaderOne from '../header/HeaderOne';
import SignInLogo from '../images/SignInLogo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: ''
  });

  const [warning, setWarning] = useState({
    firstname: false,
    lastname: false,
    username: false,
    password: false
  });

  const [helper, setHelper] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: ''
  });

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

  const handleSubmit = () => {
    if (
      state.firstname === '' ||
      state.lastname === '' ||
      state.username === '' ||
      state.password === ''
    ) {
      toast.error('Please fill-up all fields!', {
        position: toast.POSITION.TOP_CENTER
      });
    } else {
      axios(
        'http://localhost:3008/api/register',
        {
          method: 'post',
          data: state
        },
        setLoading(true)
      ).then(() => {
        setTimeout(() => {
          setLoading(false);
          window.location.href = '/';
        }, 3000);
      });
    }
  };

  const handleClick = () => {
    window.location.href = '/';
  };

  return (
    <StyledLR>
      <ToastContainer enableMultiContainer />
      <HeaderOne />
      <Grid container component="main" className="grid">
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className="gridImagee" />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className="divContainer">
            <img src={SignInLogo} alt="register" className="image" />
            <br />
            <form className="form" noValidate>
              <TextField
                label="First Name"
                name="firstname"
                variant="outlined"
                onChange={handleChange}
                value={state.firstname}
                error={warning.firstname}
                onBlur={updateWarning}
                helperText={helper.firstname}
                className="textfield"
              />
              <TextField
                label="Last Name"
                name="lastname"
                variant="outlined"
                onChange={handleChange}
                value={state.lastname}
                error={warning.lastname}
                onBlur={updateWarning}
                helperText={helper.lastname}
                className="textfield"
              />
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
                <>
                  <Button
                    variant="contained"
                    color="secondary"
                    className="btn"
                    onClick={handleSubmit}
                  >
                    Register
                  </Button>
                  <Fab size="large" className="iconBtn" onClick={handleClick}>
                    <KeyboardBackspace />
                  </Fab>
                </>
              )}
            </form>
          </div>
        </Grid>
      </Grid>
    </StyledLR>
  );
}
