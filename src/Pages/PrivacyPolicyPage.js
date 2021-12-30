import { Grid, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import ArrowBack from '@mui/icons-material/ArrowBack';

export const PrivacyPolicyPage = () => {
  const navigate = useNavigate();

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
          Privacy Policy
        </Typography>        
        </Toolbar>
      </AppBar>

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        We don't store your data. <i>period.</i>

        We physically can't. We have nowhere to store it. This is a just a simple single page application running completely in your browser with <i>no backend or storage</i>.

        <ul>
          <li>We have no tracking cookies, no ads, not even simple statistics. We have no way of knowing if anyone is even using this, except for the OAuth rate limit counter for the Google OAuth 2.0 Client ID.</li>
          <li>You settings are stored in your <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API">browser's local storage</a>. This information never leaves the browser.</li>
          <li>The only cookies used are the ones set and managed by the Google Client libraries.</li>
        </ul>
      </Grid>
    </>
  )
}