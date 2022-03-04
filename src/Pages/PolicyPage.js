import { AppBar, Toolbar, IconButton, Typography, Container } from '@mui/material';
import { useNavigate } from "react-router-dom";
import ArrowBack from '@mui/icons-material/ArrowBack';


export const PolicyPage = ({title, children}) => {
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
            {title}
          </Typography>        
        </Toolbar>
      </AppBar>

      <Container
        sx={{
          maxHeight: "calc(100vh - 128px)",
          height: "calc(100vh - 128px)"
        }}
      >
        {children}
      </Container>
    </>
  )
}