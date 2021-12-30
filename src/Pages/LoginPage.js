import { Box, Button, Grid, Typography } from '@mui/material';
import { useNavigate, Link } from "react-router-dom";
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
      <Typography variant="h1">MultiMeet</Typography>
      <Button onClick={() => auth.signIn()} color="inherit">
        Login
      </Button>
      <Box>
        <Link to='/privacy'>Privacy Policy</Link>
      </Box>
    </Grid>
  )
}