
import { IconButton } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const ExpandMoreButton = ({ expanded, setExpanded }) => (
  <IconButton onClick={() => setExpanded(!expanded)}>
    <ExpandMoreIcon sx={{
      transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform',
      transitionDuration: "300ms",
    }} />
  </IconButton>
)
