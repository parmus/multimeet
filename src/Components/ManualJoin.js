import { useState } from 'react';
import { TextField, Stack, Card, CardHeader, CardContent } from '@mui/material';
import { GoogleMeetButton } from './GoogleMeetButton';

export const  ManualJoin = () => {
  const [meetID, setMeetID] = useState('');

  return (
    <Card variant="outlined">
      <CardHeader title="Join Google Meet by ID"/>
      <CardContent>
      <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
        <TextField
          variant="outlined"
          value={meetID}
          onChange={event => setMeetID(event.target.value.trim())}
          placeholder="Enter Meet ID" />
        <GoogleMeetButton disabled={meetID === ""} href={`https://meet.google.com/${meetID}`} />
      </Stack>
      </CardContent>
    </Card>
  );
}
