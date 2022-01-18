import React, { createContext } from "react"
import { useLocalStorage, useLocalStorageBool } from './utils';


export const SettingsContext = createContext({
    calendarId: "",
    setCalendarId: calendarId => {},
    openTeamInBrowser: true,
    setOpenTeamInBrowser: openTeamInBrowser => {},
    renderLinksInDescription: true,
    setRenderLinksInDescription: renderLinksInDescription => {},
})

export const SettingsContextProvider = ({children}) => {
    const [calendarId, setCalendarId] = useLocalStorage('calendarId', 'primary')
    const [openTeamInBrowser, setOpenTeamInBrowser] = useLocalStorageBool('openTeamInBrowser', true)
    const [renderLinksInDescription, setRenderLinksInDescription] = useLocalStorageBool('renderLinksInDescription', true)
    
    return (
        <SettingsContext.Provider value={{
            calendarId: calendarId,
            setCalendarId: setCalendarId,
            openTeamInBrowser: openTeamInBrowser,
            setOpenTeamInBrowser: setOpenTeamInBrowser,
            renderLinksInDescription: renderLinksInDescription,
            setRenderLinksInDescription: setRenderLinksInDescription,
        }}>
            {children}
        </SettingsContext.Provider>
    )
}