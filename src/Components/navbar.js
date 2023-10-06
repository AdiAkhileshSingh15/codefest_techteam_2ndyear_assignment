import React from 'react';
import { Link } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
          <Typography variant="h6" component={Link} to="/" color="inherit" underline="none">
            Workout Buddy CF 2k23
          </Typography>
          <Box>
            <Button component={Link} to="/" color="inherit">
              Home
            </Button>
            <Button component={Link} to="/about" color="inherit">
              About Us
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
