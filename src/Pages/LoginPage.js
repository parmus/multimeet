import { Box, Button, Grid, Typography } from '@mui/material';
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from 'react';
import GoogleSignInButtonNormal from '../Icons/google_signin_buttons/2x/btn_google_signin_dark_normal_web@2x.png';
import GoogleSignInButtonFocus from '../Icons/google_signin_buttons/2x/btn_google_signin_dark_focus_web@2x.png';
import GoogleSignInButtonPressed from '../Icons/google_signin_buttons/2x/btn_google_signin_dark_pressed_web@2x.png';
import { ExternalLink } from '../utils';


export const LoginPage = ({ auth }) => {
  const navigate = useNavigate();
  const loggedIn = auth.isSignedIn.get();

  useEffect(() => {
    if (loggedIn) navigate('/')
  }, [loggedIn, navigate])

  if (loggedIn) return null

  const style = {
    backgroundImage: `url(${GoogleSignInButtonNormal})`,
    width: 382,
    height: 92,
    margin: 0,
    '&:hover': {
      backgroundImage: `url(${GoogleSignInButtonFocus})`,
    },
    '&:active': {
      backgroundImage: `url(${GoogleSignInButtonPressed})`,
    },
  }

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
      <Button onClick={() => auth.signIn()} color="inherit" sx={style}/>
      <Box sx={{
        "& a:not(:last-child)::after": {
          "content": "\" | \""
        }
      }}>
        <ExternalLink href="https://github.com/parmus/multimeet">About MultiMeet</ExternalLink>
        <Link to='/tos'>Terms of Service</Link>
        <Link to='/privacy'>Privacy Policy</Link>
      </Box>
    </Grid>
  )
}