import { createTheme } from '@mui/material';


export const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          margin: "16px 0",
          borderRadius: "16px",
        }
      }
    }
  },
  typography: {
    //fontSize: 16,
  }
})


export const globalCss = {
  '::-webkit-scrollbar': {
    background: 'transparent',
    width: '8px'
  },
  '::-webkit-scrollbar-thumb': {
    background: '#999999',
    width: '4px',
    borderRadius: '10px',
  },
}