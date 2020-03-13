import React, { useState, useEffect, forwardRef } from 'react';
import { Dialog, AppBar, Toolbar, Slide, Typography, InputLabel, MenuItem, FormControl, Select, Fab, IconButton } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import GroupAdd from '@material-ui/icons/GroupAdd';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';

export default function AddGroupMember({
  handleOpen,
  handleClose,
  handleComponent,
  contactId
}) {
  const user_id = localStorage.getItem('id');
  const [component, setComponent] = useState(true);
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState([]);

  useEffect(() => {
    if (component) {
      axios(`http://localhost:3008/api/getGroups/${user_id}`, {
        method: 'get'
      }).then(function(res) {
        setGroups(res.data);
      });
      setComponent(false);
    }
  }, [component, user_id]);

  const handleAdd = () => {
    axios(`http://localhost:3008/api/addMembers/${contactId}`, {
      method: 'post',
      data: group
    }).then(() => {
      handleComponent();
      handleClose();
    });
  };

  return (
    <>
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
              Add Contact to Group
            </Typography>

            <IconButton color="inherit" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <div style={formDiv}>
          <FormControl>
            <InputLabel htmlFor="select-multiple-checkbox">
              Select Group
            </InputLabel>
            <Select
              multiple
              style={select}
              value={group}
              onChange={e => setGroup(e.target.value)}
            >
              {groups.map(i => (
                <MenuItem key={i.id} value={i.id}>
                  {i.groupname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Fab variant="extended" style={fab} onClick={handleAdd}>
            <AddIcon style={add} /> Add
          </Fab>
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

const select = {
  width: '200px'
};
const fab = {
  width: '150px',
  height: '50px',
  margin: '10px'
};
const add = {
  marginRight: '20px',
  fontWeight: 'bold'
};
