import { useEffect, useRef, useState, useContext, useCallback } from 'react';
import { CalendarItem } from './CalendarItem';
import { Alert, Grid } from '@mui/material';
import { ManualJoin } from './ManualJoin';
import { SettingsContext } from '../settingsContext';

const teamsLinkRegExp = new RegExp('https://teams.microsoft.com/l/meetup-join/[^>]+')

const processItem = item => {
  try {
    item.allDay = item.start.date !== undefined
    item.start = new Date(item.start.dateTime || item.start.date)
    item.end = new Date(item.end.dateTime || item.end.date)

    if (item.description) {
      item.description = item.description.trim()
      const linkMatch = item.description.match(teamsLinkRegExp)
      if (linkMatch) {
        item.teamsLink = linkMatch[0]
      }
    }

    item.responseStatus = item.attendees.reduce((responseStatus, attendee) => attendee.self ? attendee.responseStatus : responseStatus)

    return item
  } catch (error) {
    error.item = item
    throw error
  }
}

const findCurrentEvent = (items, now) => {
  if (items.length < 1) return;

  const onGoingEvent = items.slice().reverse().find(item => !item.allDay && item.start <= now && item.end >= now);
  if (onGoingEvent) return onGoingEvent;

  const nextUpcomingEvent = items.find(item => !item.allDay && item.start >= now);
  if (nextUpcomingEvent) return nextUpcomingEvent;

  return items[items.length - 1];
}

export function Calendar({ gapi, refreshRate = 60 }) {
  const [items, setItems] = useState()
  const [now, setNow] = useState()
  const [errorMessage, setErrorMessage] = useState(null)
  const settings = useContext(SettingsContext)
  const timerID = useRef(null)
  const currentEventRef = useCallback(node => {
    if (node !== null) node.scrollIntoView({behavior: "smooth", block: "center"});
  }, []);

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
      } catch (error) {
        setItems([])
        if (error.item) {
          // Exception thrown during processing of a calendar item
          console.error("Error while processing calendar item: %O\n\nItem:\n%s", error, JSON.stringify(error.item, undefined, 2))
          setErrorMessage("Error while processing calendar item. See console for details.")
          return
        }

        switch(error.status) {
          case undefined:
            // This is not an API error. Let's just log what it is
            console.error(error);
            break;

          default:
          case 400:
            console.error("Unable to load calendar: %O", error.result);
            setErrorMessage("Unable to load calendar")
            break;

          case 404:
            console.error("Calendar not found: %O", error.result);
            setErrorMessage("Calendar not found")
            break;
        }
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

  const currentEvent = findCurrentEvent(items, now);

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
              ref={item === currentEvent ? currentEventRef : undefined}
              item={item}
              now={now}
              openTeamInBrowser={settings.openTeamInBrowser}
            />
          )}
        </Grid>
      </Grid>
    </>
  )
}
