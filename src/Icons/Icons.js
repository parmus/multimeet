import { SvgIcon } from "@mui/material"
import { ReactComponent as MicrosoftTeamsSVG } from "./microsoft_office_teams_logo_icon.svg"
import { ReactComponent as GoogleMeetSVG } from "./google_meet_new_logo_icon.svg"

export const MicrosoftTeamsIcon = props => <SvgIcon component={MicrosoftTeamsSVG} viewBox="0 0 128 128" {...props}/>
export const GoogleMeetIcon = props => <SvgIcon component={GoogleMeetSVG} viewBox="0 0 32 32" {...props}/>
