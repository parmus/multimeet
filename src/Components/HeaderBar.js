import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Avatar, ListItemIcon, Divider } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import PrivacyTipOutlinedIcon from '@mui/icons-material/PrivacyTipOutlined';

export const HeaderBar = ({ auth, title="" }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null)
  const handleClose = () => setAnchorEl(null);

  const logout = () => {
    setAnchorEl(null)
    auth.signOut()
  }

  return (
    <AppBar position="sticky">
      <Toolbar>
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
              <MenuItem onClick={() => navigate('/settings')}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <Divider/>
              <MenuItem onClick={() => navigate('/privacy')}>
                <ListItemIcon>
                  <PrivacyTipOutlinedIcon fontSize="small" />
                </ListItemIcon>
                Privacy Policy
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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}