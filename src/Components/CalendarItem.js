import { Card } from "@mui/material"
import { CardContent } from "@mui/material"
import { CardActions } from "@mui/material"
import { Typography } from "@mui/material"
import { LinearProgress } from "@mui/material"
import { GoogleMeetButton } from "./GoogleMeetButton"
import { MicrosoftTeamsButton } from "./MicrosoftTeamsButton"


const formatTime = datetime => {
  return datetime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}


export const CalendarItem = ({ now, start, end, summary, hangoutLink, teamsLink, openTeamInBrowser }) => {
  const cls = now < start ? 'future' : (now < end ? 'ongoing' : 'past')

  const sx = {}

  if (cls === 'past') {
    sx.opacity = "0.3"
  }

  return (
    <Card sx={ sx } raised={cls === 'ongoing'}>
      <CardContent>
        <Typography variant="h5" component="div">
          {summary}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {formatTime(start)}-{formatTime(end)}
        </Typography>
        { cls === 'ongoing' && (
          <LinearProgress variant="determinate" value={((now-start) / (end-start)) * 100} />
        )}
      </CardContent>
      <CardActions>
      {hangoutLink && (<GoogleMeetButton href={hangoutLink}/>)}
      {teamsLink && (<MicrosoftTeamsButton openInBrowser={openTeamInBrowser} href={teamsLink}/>)}
      </CardActions>
    </Card>
  )
}

