import { Calendar } from '../Components/Calendar';
import { HeaderBar } from '../Components/HeaderBar';


export const CalendarPage = ({ auth, calendarId, title, gapi, openTeamInBrowser}) => {
    return (
        <>
            <HeaderBar auth={auth} title={title}/>
            <Calendar gapi={gapi} calendarId={calendarId} openTeamInBrowser={openTeamInBrowser}/>
        </>
    )
}