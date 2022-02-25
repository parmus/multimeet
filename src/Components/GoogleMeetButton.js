import { Button } from "@mui/material";
import { GoogleMeetIcon } from "../Icons/Icons";

export const GoogleMeetButton = ({ href, onClick, ...props }) => {
  const joinMeeting = event => {
    window.open(href, '_blank', ['noopener', 'noreferrer']);
    console.debug("Here!");
    if (onClick) onClick(event);
  }

  return (
    <Button
      variant="outlined"
      size="large"
      onClick={joinMeeting}
      {...props}
    >
      <GoogleMeetIcon sx={{ marginRight: "10px" }} />
      Join Meet
    </Button>
  )
}