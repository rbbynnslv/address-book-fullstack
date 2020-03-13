import React, { useState, forwardRef } from 'react';
import { Dialog, AppBar, Toolbar, Slide, TextField, Typography, Fab, IconButton } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import GroupAdd from '@material-ui/icons/GroupAdd';
import CloseIcon from '@material-ui/icons/Close';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function AddGroup({ handleOpen, handleClose, handleComponent }) {
  const id = localStorage.getItem('id');
  const [state, setState] = useState({ user_id: id, groupname: '' });

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleAdd = () => {
    if (state.groupname === '') {
      toast.error('Please insert a group name!', {
        position: toast.POSITION.TOP_CENTER
      });
    } else {
      axios(`http://localhost:3008/api/addGroup/${id}`, {
        method: 'post',
        data: state
      }).then(() => {
        handleComponent();
        handleClose();
      });
    }
  };

  return (
    <>
      <ToastContainer enableMultiContainer />
      <Dialog
        open={handleOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
        maxWidth={'md'}
      >
        <AppBar style={app}>
          <Toolbar>
            <GroupAdd />
            <Typography variant="h6" style={typo}>
              Add Group
            </Typography>

            <IconButton color="inherit" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <div style={formDiv}>
          <form noValidate>
            <TextField
              label="Group Name"
              name="groupname"
              variant="outlined"
              onChange={handleChange}
              value={state.groupname}
              style={textField}
            />
            <Fab variant="extended" style={fab} onClick={handleAdd}>
              <AddIcon style={add} /> Add
            </Fab>
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
const formDiv = {
  display: 'flex',
  flexDirection: 'row',
  margin: '30px'
};
const textField = {
  width: '250px',
  height: '30px',
  marginRight: '10px'
};
const fab = {
  width: '150px',
  height: '50px'
};
const add = {
  marginRight: '20px',
  fontWeight: 'bold'
};
