import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Avatar, Button, ListItemIcon, Divider } from '@mui/material';
import { useState } from 'react';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';


export const HeaderBar = ({ title="", auth, openSettings }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const loggedIn = auth.isSignedIn.get();
  const handleClose = () => setAnchorEl(null);

  const logout = () => {
    setAnchorEl(null)
    auth.signOut()
  }

  return (
    <AppBar position="sticky">
      <Toolbar>
        {loggedIn ? (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={event => setAnchorEl(event.currentTarget)}
              color="inherit"
            >
              <Avatar alt="Remy Sharp" src={auth.currentUser.get().getBasicProfile().getImageUrl()} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => {openSettings(); handleClose();}}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <Divider/>
              <MenuItem onClick={logout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <Button onClick={() => auth.signIn()}color="inherit">Login</Button>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}