import React, { useState, useEffect, forwardRef } from 'react';
import { CssBaseline, Card, CardContent, CardMedia, CardActionArea, CardActions, Typography, Tooltip, Dialog, AppBar, Toolbar, Slide, Fab, IconButton } from "@material-ui/core";
import Group from '@material-ui/icons/Group';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import CloseIcon from '@material-ui/icons/Close';
import Image from '../../images/User.svg';
import axios from 'axios';

export default function ViewGroupMembers({ handleOpen, handleClose, groupId }) {
  const [component, setComponent] = useState(true);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (component) {
      axios(`http://localhost:3008/api/getMembers/${groupId}`, {
        method: 'get'
      }).then(function(res) {
        setContacts(res.data);
      });
      setComponent(false);
    }
  }, [component, groupId]);

  return (
    <>
      <CssBaseline />
      <Dialog
        fullScreen
        open={handleOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar style={app}>
          <Toolbar>
            <Group />
            <Typography variant="h6" style={typo}>
              View Group Members
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div style={mainDiv}>
          {!component
            ? contacts.map(i => (
                <Card style={card} key={i.id}>
                  <div style={divCard}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt="group"
                        height="140"
                        src={Image}
                      />
                      <CardContent>
                        <Typography component="h5">
                          <b>{i.firstname} {i.lastname}</b>
                        </Typography>
                        <Typography component="h5">
                          Mobile Phone: {i.mobile_phone}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Tooltip
                        title="Delete Contact from Group"
                        placement="top"
                      >
                        <Fab
                          color="secondary"
                          style={fab}
                          onClick={() => {
                            alert(
                              'Are you sure you want to delete group member?'
                            );
                            axios(
                              `http://localhost:3008/api/deleteMember/${i.contact_id}/${i.group_id}`,
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
      </Dialog>
    </>
  );
}
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const app = {
  position: 'relative',
  marginBottom: '20px'
};
const typo = {
  marginLeft: '10px',
  flex: 1
};
const mainDiv = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  overflow: 'hidden'
};
const card = {
  display: 'flex',
  width: '300px',
  height: '300px',
  margin: '5px 5px'
};
const divCard = {
  display: 'flex',
  flexDirection: 'column'
}
const fab = {
  margin: '2px'
}