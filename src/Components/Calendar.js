import { useEffect, useRef, useState, useContext } from 'react';
import { CalendarItem } from './CalendarItem';
import { Alert, Grid } from '@mui/material';
import { ManualJoin } from './ManualJoin';
import { SettingsContext } from '../settingsContext';

const teamsLinkRegExp = new RegExp('https://teams.microsoft.com/l/meetup-join/[^>]+')

const processItem = item => {
  item.allDay = item.start.date !== undefined
  item.start = new Date(item.start.dateTime || item.start.date)
  item.end = new Date(item.end.dateTime || item.end.date)

  if (item.description) {
    const linkMatch = item.description.match(teamsLinkRegExp)
    if (linkMatch) {
      item.teamsLink = linkMatch[0]
    }
  }

  item.responseStatus = item.attendees.reduce((responseStatus, attendee) => attendee.self ? attendee.responseStatus : responseStatus)

  return item
}


export function Calendar({ gapi, refreshRate = 60 }) {
  const [items, setItems] = useState()
  const [now, setNow] = useState()
  const [errorMessage, setErrorMessage] = useState(null)
  const settings = useContext(SettingsContext)


  const timerID = useRef(null)

  useEffect(() => {
    if (!gapi) return

    clearTimeout(timerID.current)

    const refresh = async() => {
      const now = new Date();
      setNow(now)

      const timeMin = new Date(now)
      timeMin.setHours(0)
      timeMin.setMinutes(0)
      timeMin.setSeconds(0)
      timeMin.setMilliseconds(0)

      const timeMax = new Date(timeMin)
      timeMax.setDate(timeMin.getDate() + 1)

      try {
        const response = await gapi.client.calendar.events.list({
          calendarId: settings.calendarId,
          singleEvents: true,
          orderBy: 'startTime',
          timeMin: timeMin.toISOString(),
          timeMax: timeMax.toISOString(),
        })
        setErrorMessage(null);
        setItems(response.result.items.map(processItem))
      } catch (response) {
        setItems([])
        switch(response.status) {
          default:
          case 400:
            setErrorMessage("Unable to load calendar")
            break;
          case 404:
            setErrorMessage("Calendar not found")
            break;
        }
        console.error(response.result);
      }
    }
    refresh()
    timerID.current = setInterval(refresh, refreshRate * 1000)

    return () => {
      console.log('Stop timer')
      clearTimeout(timerID.current)
    }
  }, [settings.calendarId, gapi, refreshRate, timerID,
      setErrorMessage, setItems, setNow]);

  if (!items) return null;
  return (
    <>
      { errorMessage && (<Alert severity="error">{errorMessage}</Alert>) }
      <Grid container spacing={1} justifyContent="center" alignItems="center" sx={{ maxHeight: "calc(100vh - 64px)", height: "calc(100vh - 64px)" }}>
        <Grid item xs={6} textAlign="center">
          <ManualJoin/>
        </Grid>
        <Grid item xs={6} sx={{ overflow: "hidden auto", maxHeight: "calc(100vh - 64px)" }}>
          {items.map((item, index) =>
            <CalendarItem
              key={index}
              now={now}
              openTeamInBrowser={settings.openTeamInBrowser}
              {...item}
            />
          )}
        </Grid>
      </Grid>
    </>
  )
}
