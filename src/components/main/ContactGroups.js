import React, { useState, useEffect } from 'react';
import { CssBaseline, Card, CardContent, CardMedia, CardActionArea, CardActions, Typography, Tooltip, Fab } from '@material-ui/core';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import Group from '@material-ui/icons/Group';
import AddIcon from '@material-ui/icons/Add';
import { StyledAG } from '../styles/styles';
import HeaderTwo from '../header/HeaderTwo';
import AddGroup from '../modal/group/AddGroup';
import ViewGroupMembers from '../modal/group/ViewGroupMembers';
import Image from '../images/Group.svg';
import axios from 'axios';

export default function ContactGroups() {
  const user_id = localStorage.getItem('id');

  const [openAddGroup, setOpenAddGroup] = useState(false);
  const [openViewGroup, setOpenViewGroup] = useState(false);
  const [component, setComponent] = useState(true);
  const [groupId, setGroupId] = useState('');
  const [groups, setGroups] = useState([]);

  const handleCloseAddGroup = () => {
    setOpenAddGroup(false);
  };

  const handleCloseViewGroup = () => {
    setOpenViewGroup(false);
  };

  const handleComponent = () => {
    setComponent(true);
  };

  const handleContact = () => {
    window.location.href = '/main';
  }


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

  return (
    <StyledAG>
      <CssBaseline />
      <HeaderTwo />
      <div className="contacts">
        <Fab
          variant="extended"
          className="fab"
          onClick={() => {setOpenAddGroup(true)}}
        >
          <AddIcon className="icon" /> Add Group
        </Fab>

        <Fab
          variant="extended"
          className="fab"
          onClick={handleContact}
        >
          <Group className="icon" /> View Contacts
        </Fab>
      </div>

      <div className="divMain">
        {!component
          ? Object.keys(groups).map(i => (
              <Card className="cardContent" key={groups[i].id}>
                <div className="divFlex">
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="group"
                      height="140"
                      src={Image}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {groups[i].groupname}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Tooltip title="View Group Members" placement="top">
                      <Fab
                        color="secondary"
                        className="fabMargin"
                        onClick={() => {
                          setOpenViewGroup(true);
                          setGroupId(groups[i].id);
                        }}
                      >
                        <RemoveRedEye />
                      </Fab>
                    </Tooltip>
                    <Tooltip title="Delete Group" placement="top">
                      <Fab
                        color="primary"
                        className="fabMargin"
                        onClick={() => {
                          alert('Are you sure you want to delete this group?');
                          axios(
                            `http://localhost:3008/api/deleteGroup/${groups[i].id}`,
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

      {openAddGroup ? (
        <AddGroup
          handleOpen={openAddGroup}
          handleClose={handleCloseAddGroup}
          handleComponent={handleComponent}
        />
      ) : null}

      {openViewGroup ? (
        <ViewGroupMembers
          groupId={groupId}
          handleOpen={openViewGroup}
          handleClose={handleCloseViewGroup}
        />
      ) : null}
    </StyledAG>
  );
}