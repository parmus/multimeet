import { useState } from 'react';
import { TextField, Stack, Card, CardHeader, CardContent } from '@mui/material';
import { GoogleMeetButton } from './GoogleMeetButton';

export const  ManualJoin = () => {
  const [meetID, setMeetID] = useState('');
  const meetingURL = `https://meet.google.com/${meetID}`;

  return (
    <Card variant="outlined">
      <CardHeader title="Join Google Meet by ID"/>
      <CardContent>
      <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
        <TextField
          variant="outlined"
          value={meetID}
          onChange={event => setMeetID(event.target.value.trim())}
          onKeyPress={e => {
            if (meetID === "") return;
            if (e.key === "Enter") {
              window.open(meetingURL, '_blank', ['noopener', 'noreferrer']);
              setMeetID("");
            }
          }}
          placeholder="Enter Meet ID" />
        <GoogleMeetButton
          disabled={meetID === ""}
          onClick={() => setMeetID("")}
          href={meetingURL}
        />
      </Stack>
      </CardContent>
    </Card>
  );
}
