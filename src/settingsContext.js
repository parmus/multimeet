import React, { createContext } from "react"
import { useLocalStorage, useLocalStorageBool } from './utils';


export const SettingsContext = createContext({
    calendarId: "",
    setCalendarId: calendarId => {},
    openTeamInBrowser: true,
    setOpenTeamInBrowser: openTeamInBrowser => {},
})

export const SettingsContextProvider = ({children}) => {
    const [calendarId, setCalendarId] = useLocalStorage('calendarId', 'primary')
    const [openTeamInBrowser, setOpenTeamInBrowser] = useLocalStorageBool('openTeamInBrowser', true)
    
    return (
        <SettingsContext.Provider value={{
            calendarId: calendarId,
            setCalendarId: setCalendarId,
            openTeamInBrowser: openTeamInBrowser,
            setOpenTeamInBrowser: setOpenTeamInBrowser,
        }}>
            {children}
        </SettingsContext.Provider>
    )
}