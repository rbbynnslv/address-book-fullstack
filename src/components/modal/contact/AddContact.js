import React, { useState, forwardRef } from 'react';
import { Dialog, AppBar, Toolbar, Slide, TextField, Typography, Fab, IconButton, CircularProgress } from "@material-ui/core";
import { green } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
import PersonAdd from '@material-ui/icons/PersonAdd';
import CloseIcon from '@material-ui/icons/Close';
import Image from '../../images/Background-3.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function AddContact({
  handleOpen,
  handleClose,
  handleComponent
}) {
  const id = localStorage.getItem('id');
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState({
    user_id: id,
    firstname: '',
    lastname: '',
    email: '',
    home_phone: '',
    mobile_phone: '',
    work_phone: '',
    city: '',
    state: '',
    country: '',
    postal_code: ''
  });

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleAdd = () => {
    if (
      state.firstname === '' ||
      state.lastname === '' ||
      state.email === '' ||
      state.home_phone === '' ||
      state.mobile_phone === '' ||
      state.work_phone === '' ||
      state.city === '' ||
      state.state === '' ||
      state.country === '' ||
      state.postal_code === ''
    ) {
      toast.error('Please fill-up all fields!', {
        position: toast.POSITION.TOP_CENTER
      });
    } else {
      axios('http://localhost:3008/api/addContact', {
        method: 'post',
        data: state
      }, setLoading(true))
      .then(() => {
        setTimeout(() => {
        handleComponent();
        handleClose();
        }, 3000);
      })
    }
  };

  return (
    <>
      <ToastContainer enableMultiContainer />
      <Dialog
        fullScreen
        open={handleOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar style={app}>
          <Toolbar>
            <PersonAdd />
            <Typography variant="h6" style={typo}>
              Add Contact
            </Typography>

            <IconButton color="inherit" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <div style={image}>
          <form style={form} noValidate>
            <div style={formDiv}>
              <TextField
                label="First Name"
                name="firstname"
                variant="outlined"
                onChange={handleChange}
                value={state.firstname}
                style={textField}
              />
              <TextField
                label="Last Name"
                name="lastname"
                variant="outlined"
                onChange={handleChange}
                value={state.lastname}
                style={textField}
              />
              <TextField
                label="Email"
                name="email"
                variant="outlined"
                onChange={handleChange}
                value={state.email}
                style={textField}
              />
            </div>

            <div style={formDiv}>
              <TextField
                label="Home Phone"
                name="home_phone"
                variant="outlined"
                onChange={handleChange}
                value={state.home_phone}
                type="number"
                style={textField}
              />
              <TextField
                label="Mobile Phone"
                name="mobile_phone"
                variant="outlined"
                onChange={handleChange}
                value={state.mobile_phone}
                type="number"
                style={textField}
              />
              <TextField
                label="Work Phone"
                name="work_phone"
                variant="outlined"
                onChange={handleChange}
                value={state.work_phone}
                type="number"
                style={textField}
              />
            </div>

            <div style={formDiv}>
              <TextField
                label="City"
                name="city"
                variant="outlined"
                onChange={handleChange}
                value={state.city}
                style={textField}
              />
              <TextField
                label="State/Province"
                name="state"
                variant="outlined"
                onChange={handleChange}
                value={state.state}
                style={textField}
              />
              <TextField
                label="Country"
                name="country"
                variant="outlined"
                onChange={handleChange}
                value={state.country}
                style={textField}
              />
            </div>

            <div style={formDiv}>
              <TextField
                label="Postal Code"
                name="postal_code"
                variant="outlined"
                onChange={handleChange}
                value={state.postal_code}
                type="number"
                style={textField}
              />
            </div>
            <div style={btn}>
            {loading && (
                <CircularProgress size={70} style={{ color: green[500], margin: '50px' }} />
            )}

            {loading ? null :
              <Fab
                color="secondary"
                variant="extended"
                style={fab}
                onClick={handleAdd}
              >
                <AddIcon style={add} /> Add
              </Fab>
            } 
            </div>
          </form>
        </div>
      </Dialog>
    </>
  );
}
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const app = {
  position: 'relative'
};
const typo = {
  marginLeft: '10px',
  flex: 1
};
const form = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '30px'
};
const image = {
  height: '100vh',
  backgroundImage: `url(${Image})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
};
const formDiv = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
};
const textField = {
  width: '250px',
  height: '30px',
  margin: '30px'
};
const btn = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: '20px'
};
const fab = {
  width: '150px', 
  height: '50px'
}
const add = {
  marginRight: '20px',
  fontWeight: 'bold'
}