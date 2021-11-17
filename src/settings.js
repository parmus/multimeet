export const clientId = process.env.REACT_APP_CLIENTID;

export const discoveryDocs = [
  'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
]

export const scopes = [
  'profile',
  'https://www.googleapis.com/auth/calendar.readonly',
]