import { Button } from "@mui/material";
import { MicrosoftTeamsIcon } from "../Icons/Icons";

export const MicrosoftTeamsButton = ({ href, openInBrowser = true, ...props })=> {
  if (openInBrowser){
    href = href.replace('/l/', '/_#/l/')
  }
  return (
    <Button
      target="_blank"
      href={href}
      rel="noreferrer"
      variant="outlined"
      size="large"
      {...props}
    >
      <MicrosoftTeamsIcon sx={{ marginRight: "10px" }} />
      Join Teams
    </Button>
  )
}
