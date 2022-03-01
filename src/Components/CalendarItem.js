import { useState, useContext, forwardRef } from "react"
import { Card, Collapse } from "@mui/material"
import { CardContent } from "@mui/material"
import { CardActions } from "@mui/material"
import { CardHeader } from "@mui/material"
import { Typography } from "@mui/material"
import { LinearProgress } from "@mui/material"
import { GoogleMeetButton } from "./GoogleMeetButton"
import { MicrosoftTeamsButton } from "./MicrosoftTeamsButton"
import { ExpandMoreButton } from "./ExpandMoreButton"
import { SettingsContext } from "../settingsContext"


const formatTime = datetime => datetime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })


export const CalendarItem = forwardRef(({
  now,
  openTeamInBrowser,
  item: {
    attendees,
    start,
    end,
    allDay,    
    summary,
    description,
    hangoutLink,
    teamsLink, 
  }
}, ref) => {
  const [expanded, setExpanded] = useState(false)
  const settings = useContext(SettingsContext)

  if (settings.hideDeclined && attendees && attendees.some(a => a.self && a.responseStatus === "declined")) return null;

  const cls = now < start ? 'future' : (now < end ? 'ongoing' : 'past')

  const sx = {}

  if (cls === 'past') {
    sx.opacity = "0.3"
  }

  if (settings.renderLinksInDescription && description) {
     description = description
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/(http[s]?:\/\/\S+)/g, '<a href="$1" target="_blank" rel="noreferrer">$1</a>')
  }

  const duration = allDay ? (<i>All day</i>) : `${formatTime(start)} - ${formatTime(end)}`

  return (
    <Card ref={ref} sx={ sx } raised={!allDay && cls === 'ongoing'}>
      <CardHeader
        title={summary}
        subheader={duration}
        action={description && (<ExpandMoreButton expanded={expanded} setExpanded={setExpanded}/>)}
      />
      <CardContent sx={{ mb: 1.5 }}>
        { description && (
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            { settings.renderLinksInDescription ? (
              <Typography
              sx={{ whiteSpace: "pre" }}
              dangerouslySetInnerHTML={{__html: description}}
              />
            ) : (
              <Typography sx={{ whiteSpace: "pre" }}>{description}</Typography>
            )}
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
      </CardActions>
    </Card>
  )
});

