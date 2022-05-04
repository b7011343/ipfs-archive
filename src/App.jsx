import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { styled } from '@mui/material/styles';
import { Routes, Route } from "react-router-dom";
import { Drawer, Box, AppBar as MuiAppBar, Toolbar, Typography, Divider, IconButton } from '@mui/material';
import { DisabledByDefault, Minimize } from '@mui/icons-material';
import logo from './icon.png';


const drawerWidth = 205;

const StyledDrawer = styled(Drawer, { defaultShouldForwardProp: true })({
  flexShrink: 0,
  width: drawerWidth
});

const StyledToolbar = styled(Toolbar, { defaultShouldForwardProp: true })({
  minHeight: '65px !important',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between'
});

const AppBar = styled(MuiAppBar, { defaultShouldForwardProp: true })(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: 'white',
  boxShadow: 'none',
  minHeight: '65px',
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  position: 'absolute',
  left: '0'
}));

const StyledImg = styled('img', { defaultShouldForwardProp: true })({
    marginRight: '7.5px',
    marginBottom: '-9px',
    padding: '4px',
    width: '32px',
    height: '32px'
})

const App = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={true} className='draggable'>
        <StyledToolbar>
          <Typography
            variant="h6"
            color="black"
          >
            <StyledImg
              alt='IPFS Archive Icon'
              src={logo} 
            />
            <b>IPFS Archive</b>
          </Typography>
          <Toolbar sx={{ marginRight: '-15px' }}>
            <IconButton title='Close the app' color="default" component="span" className='undraggable' onClick={() => window.control.minimize()}>
              <Minimize/>
            </IconButton>
            <IconButton title='Minimize the app' color="error" component="span" className='undraggable' onClick={() => window.control.close()}>
              <DisabledByDefault/>
            </IconButton>
          </Toolbar>
        </StyledToolbar>
      </AppBar>
      <StyledDrawer
        variant='permanent'
        anchor='left'
        open={true}
      >
        <Divider sx={{ marginTop: '65px' }} />
        {/* <NavMenu /> */}
        <Divider />
      </StyledDrawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Routes>
          <Route path="/" element={null} />
          <Route path="/backup" element={null} />
          <Route path="/recover" element={null} />
          <Route path="/settings" element={null} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
