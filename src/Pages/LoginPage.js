import { Button, Grid } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

export const LoginPage = ({ auth }) => {
  const navigate = useNavigate();
  const loggedIn = auth.isSignedIn.get();

  useEffect(() => {
    if (loggedIn) navigate('/')
  }, [loggedIn, navigate])

  if (loggedIn) return null

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <h3>MultiMeet</h3>
      <Button onClick={() => auth.signIn()} color="inherit">
        Login
      </Button>
    </Grid>
  )
}