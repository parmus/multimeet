import { Calendar } from '../Components/Calendar';
import { HeaderBar } from '../Components/HeaderBar';


export const CalendarPage = ({ auth, title, gapi }) => {
    return (
        <>
            <HeaderBar auth={auth} title={title}/>
            <Calendar gapi={gapi}/>
        </>
    )
}