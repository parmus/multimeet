import { useEffect, useState } from 'react';
import { Alert, Dialog, DialogTitle, List, ListItem, ListItemText } from '@mui/material';

export function SettingsDialog({ open, setOpen, gapi, setCalendarId }) {
  const [calendars, setCalendars] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    if (!open) return;
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
  }, [gapi, open, setCalendars, setErrorMessage])

  const handleClose = calendarId => {
    setCalendarId(calendarId);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle>Pick Calendar</DialogTitle>
      { errorMessage && (<Alert severity="error">{errorMessage}</Alert>) }
      <List>
        {calendars.map((calendar, _) => (
          <ListItem button onClick={() => handleClose(calendar.id)} key={calendar.id}>
            <ListItemText primary={calendar.summary} secondary={calendar.description}/>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
