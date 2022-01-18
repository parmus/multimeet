import { Button } from "@mui/material";
import { GoogleMeetIcon } from "../Icons/Icons";

export const GoogleMeetButton = ({ href, ...props }) => (
  <Button
    target="_blank"
    href={href}
    rel="noreferrer"
    variant="outlined"
    size="large"
    {...props}
  >
    <GoogleMeetIcon sx={{ marginRight: "10px" }} />
    Join Meet
  </Button>
)