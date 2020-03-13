import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, CircularProgress } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import MenuBook from '@material-ui/icons/MenuBook';
import { StyledHeader } from '../styles/styles';

export default function HeaderTwo() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.clear();
      window.location.href = '/';
    }, 3000);
  };

  useEffect(() => {
    if (
      localStorage.getItem('token') === null ||
      localStorage.getItem('token').length === 0
    ) {
      window.location.href = '/';
    }
  });

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
            {loading && (
              <CircularProgress size={40} style={{ color: green[500], margin: '10px' }} />
            )}

            {loading ? null : (
              <Button color="inherit" onClick={handleClick}>
                Sign Out
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </StyledHeader>
  );
}
