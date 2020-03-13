import React, { useState, useEffect } from 'react';
import  { CssBaseline, Card, CardContent, CardMedia, CardActionArea, CardActions, Typography, Tooltip, Paper, InputBase, Fab, IconButton } from '@material-ui/core';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import GroupAdd from '@material-ui/icons/GroupAdd';
import Group from '@material-ui/icons/Group';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import HeaderTwo from '../header/HeaderTwo';
import AddContact from '../modal/contact/AddContact';
import EditContact from '../modal/contact/EditContact';
import AddGroupMember from '../modal/group/AddGroupMember';
import { StyledAG } from '../styles/styles';
import Image from '../images/User.svg';
import axios from 'axios';

export default function AdressBook() {
  const user_id = localStorage.getItem('id');

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openGroup, setOpenGroup] = useState(false);
  const [component, setComponent] = useState(true);
  const [contactId, setContactId] = useState('');
  const [contacts, setContacts] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleCloseGroup = () => {
    setOpenGroup(false);
  };

  const handleComponent = () => {
    setComponent(true);
  };

  const handleGroup = () => {
    window.location.href = '/groups';
  }

  useEffect(() => {
    if (component) {
      axios(`http://localhost:3008/api/getContacts/${user_id}`, {
        method: 'get'
      }).then(function(res) {
        setContacts(res.data);
      });
      setComponent(false);
    }
  }, [component, user_id]);

  const search = Object.keys(contacts).filter(function(obj) {
    let firstname =
      contacts[obj].firstname
        .toLowerCase()
        .indexOf(searchValue.toLowerCase()) !== -1;
    let lastname =
      contacts[obj].lastname
        .toLowerCase()
        .indexOf(searchValue.toLowerCase()) !== -1;
    var names = (firstname, lastname);
    return names;
  });

  return (
    <StyledAG>
      <CssBaseline />
      <HeaderTwo />
      <div className="contacts">
        <Fab
          variant="extended"
          className="fab"
          onClick={() => {setOpenAdd(true)}}
        >
            <AddIcon className="icon" /> Add Contact
        </Fab>
        <Fab
          variant="extended"
          className="fab"
          onClick={handleGroup}
        >
          <Group className="icon" /> View Groups
        </Fab>

        <Paper component="form" className="searchForm">
          <InputBase
            placeholder="Search for Contact.."
            className="inputbase"
            onChange={e => setSearchValue(e.target.value)}
          />
          <IconButton type="submit" className="iconSubmit">
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>

      <div className="divMain">
        {!component && contacts[0]
          ? search.map(i => (
              <Card className="cardContent" key={contacts[i].contact_id}>
                <div className="divFlex">
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="user"
                      height="140"
                      src={Image}
                    />
                    <CardContent>
                      <Typography component="h5" className="text">
                        {contacts[i].firstname} {contacts[i].lastname}
                      </Typography>
                      <Typography component="h5">
                        Mobile Phone: {contacts[i].mobile_phone}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Tooltip title="View Contact Details" placement="top">
                      <Fab
                        color="secondary"
                        className="fabMargin"
                        onClick={() => {
                          setOpenEdit(true);
                          setContactId(contacts[i].contact_id);
                        }}
                      >
                        <RemoveRedEye />
                      </Fab>
                    </Tooltip>

                    <Tooltip title="Add Contact to Group" placement="top">
                      <Fab
                        className="fabAdd"
                        onClick={() => {
                          setOpenGroup(true);
                          setContactId(contacts[i].contact_id);
                        }}
                      >
                        <GroupAdd />
                      </Fab>
                    </Tooltip>

                    <Tooltip title="Delete Contact" placement="top">
                      <Fab
                        color="primary"
                        className="fabMargin"
                        onClick={() => {
                          alert('Are you sure you want to delete contact?');
                          axios(
                            `http://localhost:3008/api/deleteContact/${contacts[i].contact_id}`,
                            { method: 'delete' }
                          )
                            .then(() => {
                              setComponent(true);
                            })
                            .catch(err => {
                              console.log(err);
                            });
                        }}
                      >
                        <DeleteIcon />
                      </Fab>
                    </Tooltip>
                  </CardActions>
                </div>
              </Card>
            ))
          : null}
      </div>

      {openAdd ? (
        <AddContact
          handleOpen={openAdd}
          handleClose={handleCloseAdd}
          handleComponent={handleComponent}
        />
      ) : null}

      {openEdit ? (
        <EditContact
          handleOpen={openEdit}
          handleClose={handleCloseEdit}
          handleComponent={handleComponent}
          editId={contactId}
        />
      ) : null}

      {openGroup ? (
        <AddGroupMember
          handleOpen={openGroup}
          handleClose={handleCloseGroup}
          handleComponent={handleComponent}
          contactId={contactId}
        />
      ) : null}
    </StyledAG>
  );
}