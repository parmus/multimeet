import { useEffect, useState, useContext } from 'react';
import { Alert, FormControlLabel, FormGroup, List, ListItemButton, ListItemText, Switch } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { SettingsContext } from '../settingsContext';

import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';


export const SettingsPage = ({ gapi }) => {
  const navigate = useNavigate();

  const [calendars, setCalendars] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const settings = useContext(SettingsContext)
  
  useEffect(() => {
    if (!gapi) return;
  
    (async () => {
      try {
        const response = await gapi.client.calendar.calendarList.list({
          minAccessRole: 'owner',
          showHidden: true,
        });
        setErrorMessage(null);
        setCalendars(response.result.items);
      } catch (response) {
        setCalendars([]);
        setErrorMessage("Failed to list calendars");
        console.error(response.result);
      }
    })();
  }, [gapi, setCalendars, setErrorMessage])

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
              size="large"
              aria-label="Back"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => navigate('/')}
              color="inherit"
            >
            <ArrowBack/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Settings
        </Typography>        
        </Toolbar>
      </AppBar>

      <FormGroup>
        <FormControlLabel
          label="Open Microsoft Teams meetings in browser"
          control={
            <Switch
              checked={settings.openTeamInBrowser}
              onChange={event => settings.setOpenTeamInBrowser(event.target.checked)}
            />
          }
        />
      </FormGroup>
  
      <h1>Pick Calendar</h1>
      { errorMessage && (<Alert severity="error">{errorMessage}</Alert>) }
      <List>
        {calendars.map((calendar, _) => (
          <ListItemButton
            key={calendar.id}
            onClick={() => settings.setCalendarId(calendar.id)}
            selected={calendar.id === settings.calendarId}
          >
            <ListItemText primary={calendar.summary} secondary={calendar.description}/>
          </ListItemButton>
        ))}
      </List>
    </>
  );
}