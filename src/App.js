import { Calendar } from './Components/Calendar';
import { HeaderBar } from './Components/HeaderBar';
import { discoveryDocs, scopes } from './settings'
import { useGoogleApi } from 'react-gapi'
import { useEffect, useState } from 'react';
import { SettingsDialog } from './SettingsDialog';
import { useLocalStorage } from './utils';


export const App = () => {
  const gapi = useGoogleApi({
    discoveryDocs: discoveryDocs,
    scopes: scopes,
  })

  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [calendarId, setCalendarId] = useLocalStorage('calendarId', 'primary')
  const [openTeamInBrowser, setOpenTeamInBrowser] = useLocalStorage('openTeamInBrowser', '1')
  const auth = gapi?.auth2.getAuthInstance()
  const isSignedIn = auth?.isSignedIn.get()

  useEffect(() => {
    if (!gapi) return;
    if (!isSignedIn) {
      setTitle('')
      return
    }
    if (!calendarId) return

    (async () => {
      try {
        const response = await gapi.client.calendar.calendars.get({
          calendarId: calendarId,
        });
        setTitle(response.result.summary);
      } catch (error) {
        setTitle('');
        console.log(error);
      }
    })();
  }, [gapi, calendarId, setTitle, isSignedIn])

  if (!auth) return null

  return (
    <>
      { isSignedIn && (<SettingsDialog gapi={gapi} open={open} setOpen={setOpen} setCalendarId={setCalendarId}/>) }
      <HeaderBar auth={auth} openSettings={() => setOpen(true)} title={title}/>
      { isSignedIn && (<Calendar gapi={gapi} calendarId={calendarId} openTeamInBrowser={openTeamInBrowser !== '0'}/>) }
    </>
  );
}

export default App;
