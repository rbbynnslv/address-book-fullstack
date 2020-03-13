import React, { useState, useEffect, forwardRef } from 'react';
import { Dialog, AppBar, Toolbar, Slide, TextField, Typography, Fab, IconButton } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import Save from '@material-ui/icons/Save';
import Image from '../../images/Background-4.svg';
import axios from 'axios';

export default function EditContact({
  handleOpen,
  handleClose,
  handleComponent,
  editId
}) {
  const [id, setId] = useState(true);
  const [state, setState] = useState({
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

  useEffect(() => {
    if (id) {
      axios(`http://localhost:3008/api/getContactById/${editId}`, {
        method: 'get'
      }).then(function(res) {
        setState({
          firstname: res.data[0].firstname,
          lastname: res.data[0].lastname,
          email: res.data[0].email,
          home_phone: res.data[0].home_phone,
          mobile_phone: res.data[0].mobile_phone,
          work_phone: res.data[0].work_phone,
          city: res.data[0].city,
          state: res.data[0].state,
          country: res.data[0].country,
          postal_code: res.data[0].postal_code
        });
      });
      setId(false);
    }
  }, [id, editId]);

  const handleEdit = () => {
    axios(`http://localhost:3008/api/editContact/${editId}`, {
      method: 'put',
      data: state
    }).then(() => {
      handleComponent();
      handleClose();
    });
  };

  return (
    <>
      <Dialog
        fullScreen
        open={handleOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar style={app}>
          <Toolbar>
            <EditIcon />
            <Typography variant="h6" style={typo}>
              Edit Contact
            </Typography>

            <IconButton color="inherit" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div style={image}>
          {!id && state.firstname ? (
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
                <Fab
                  color="secondary"
                  variant="extended"
                  style={fab}
                  onClick={handleEdit}
                >
                  <Save style={save} /> S a v e
                </Fab>
              </div>
            </form>
          ) : null}
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
};
const save = {
  marginRight: '20px',
  fontWeight: 'bold'
};
