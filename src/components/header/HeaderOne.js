import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import MenuBook from '@material-ui/icons/MenuBook';
import { StyledHeader } from '../styles/styles';

export default function HeaderOne() {
  const handleClick = () => {
    window.location.href = '/register';
  };

  return (
    <StyledHeader>
      <div className="mainHeader">
        <AppBar position="static" className="app">
          <Toolbar>
            <IconButton className="iconButton" color="inherit">
              <MenuBook />
            </IconButton>
            <Typography variant="h6" className="typo">
              Address Book
            </Typography>
            <Button color="inherit" onClick={handleClick}>
              Register
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    </StyledHeader>
  );
}
