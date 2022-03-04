import { useGoogleApi } from 'react-gapi'
import { useEffect, useState, useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { CalendarPage } from './Pages/CalendarPage';
import { LoginPage } from './Pages/LoginPage';
import { SettingsPage } from './Pages/SettingsPage';
import { PrivacyPolicyPage } from './Pages/PrivacyPolicyPage';
import { SettingsContext } from './settingsContext';
import { TermsOfServicePage } from './Pages/TermsOfServicePage';


const RequireAuth = ({ isSignedIn, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn) navigate('/login')
  }, [isSignedIn, navigate])

  if (!isSignedIn) return null
  
  return (
    <>
      {children}
    </>
  )
}


export const App = () => {
  const gapi = useGoogleApi({
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
    scopes: [
      'profile',
      'https://www.googleapis.com/auth/calendar.readonly',
    ],
  })

  const [title, setTitle] = useState('')
  const settings = useContext(SettingsContext)
  const auth = gapi?.auth2.getAuthInstance()
  const isSignedIn = auth?.isSignedIn.get()

  useEffect(() => {
    if (!gapi) return;
    if (!isSignedIn) {
      setTitle('')
      return
    }
    if (!settings.calendarId) return

    (async () => {
      try {
        const response = await gapi.client.calendar.calendars.get({
          calendarId: settings.calendarId,
        });
        setTitle(response.result.summary);
      } catch (error) {
        setTitle('');
        console.log(error);
      }
    })();
  }, [gapi, settings.calendarId, setTitle, isSignedIn])

  if (!auth) return null;

  return (
    <Routes>
      <Route path="login" element={<LoginPage auth={auth}/>}/>
      <Route index element={
        <RequireAuth isSignedIn={isSignedIn}>
          <CalendarPage
            gapi={gapi}
            auth={auth}
            title={title}
          />
        </RequireAuth>
      }/>
      <Route path="settings" element={
        <RequireAuth isSignedIn={isSignedIn}>
          <SettingsPage
            gapi={gapi}
          />
        </RequireAuth>
      }/>
      <Route path="privacy" element={<PrivacyPolicyPage/>}/>
      <Route path="tos" element={<TermsOfServicePage/>}/>
    </Routes>
  );
}

export default App;
