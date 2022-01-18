import { useState, forwardRef } from "react"
import { Card, Collapse } from "@mui/material"
import { CardContent } from "@mui/material"
import { CardActions } from "@mui/material"
import { Typography } from "@mui/material"
import { LinearProgress } from "@mui/material"
import { GoogleMeetButton } from "./GoogleMeetButton"
import { MicrosoftTeamsButton } from "./MicrosoftTeamsButton"
import { ExpandMoreButton } from "./ExpandMoreButton"

const formatTime = datetime => datetime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })


export const CalendarItem = forwardRef(({
  now,
  openTeamInBrowser,
  item: {
    start,
    end,
    allDay,    
    summary,
    description,
    responseStatus,
    hangoutLink,
    teamsLink, 
  }
}, ref) => {
  const [expanded, setExpanded] = useState(false)

  const cls = now < start ? 'future' : (now < end ? 'ongoing' : 'past')

  const sx = {}

  if (cls === 'past') {
    sx.opacity = "0.3"
  }

  if (responseStatus === 'declined') {
    sx.textDecoration = 'line-through'
  }

  const duration = allDay ? (<i>All day</i>) : `${formatTime(start)} - ${formatTime(end)}`

  return (
    <Card ref={ref} sx={ sx } raised={!allDay && cls === 'ongoing'}>
      <CardContent>
        <Typography variant="h5" component="div">
          {summary}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {duration}
        </Typography>
        { description && (
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Typography sx={{ mb: 1.5 }}>
              {description}
            </Typography>
          </Collapse>
        )}
        { cls === 'ongoing' && !allDay && (
          <LinearProgress variant="determinate" value={((now-start) / (end-start)) * 100} />
        )}
      </CardContent>
      <CardActions>
      <div style={{ flexGrow: 1, margin: 0, padding: 0 }}>
        {hangoutLink && (<GoogleMeetButton href={hangoutLink}/>)}
        {teamsLink && (<MicrosoftTeamsButton openInBrowser={openTeamInBrowser} href={teamsLink}/>)}
      </div>
      {description && (<ExpandMoreButton expanded={expanded} setExpanded={setExpanded}/>)}
      </CardActions>
    </Card>
  )
});

