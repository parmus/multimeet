import { discoveryDocs, scopes } from './settings'
import { useGoogleApi } from 'react-gapi'
import { useEffect, useState } from 'react';
import { useLocalStorage, useLocalStorageBool } from './utils';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { CalendarPage } from './Pages/CalendarPage';
import { LoginPage } from './Pages/LoginPage';
import { SettingsPage } from './Pages/SettingsPage';


export const App = () => {
  const navigate = useNavigate();
  const gapi = useGoogleApi({
    discoveryDocs: discoveryDocs,
    scopes: scopes,
  })

  const [title, setTitle] = useState('')
  const [calendarId, setCalendarId] = useLocalStorage('calendarId', 'primary')
  const [openTeamInBrowser, setOpenTeamInBrowser] = useLocalStorageBool('openTeamInBrowser', true)
  const auth = gapi?.auth2.getAuthInstance()
  const isSignedIn = auth?.isSignedIn.get()

  useEffect(() => {
    if (!gapi) return;
    if (!isSignedIn) {
      setTitle('')
      navigate('/login')
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
  }, [gapi, calendarId, setTitle, isSignedIn, navigate])

  if (!auth) return null;

  return (
    <Routes>
      <Route path="login" element={<LoginPage auth={auth}/>}/>
      {isSignedIn && (
        <>
        <Route index element={
          <CalendarPage
            gapi={gapi}
            auth={auth}
            title={title}
            calendarId={calendarId}
            openTeamInBrowser={openTeamInBrowser}
          />
        }/>
        <Route path="settings" element={
          <SettingsPage
            gapi={gapi}
            openTeamInBrowser={openTeamInBrowser}
            setOpenTeamInBrowser={setOpenTeamInBrowser}
            calendarId={calendarId}
            setCalendarId={setCalendarId}
          />
        }/>
        </>
      )}
    </Routes>
  );
}

export default App;
