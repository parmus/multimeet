import { ExternalLink } from '../utils';
import { PolicyPage } from './PolicyPage';


export const PrivacyPolicyPage = () => (
  <PolicyPage title="Privacy Policy">
    <h4>Last updated: 04 March 2022</h4>

    We don't store your data. <i>period.</i> We physically can't. We have nowhere to store it.
    This is a just a simple single page application running completely in your browser
    with <i>no backend or storage</i>.

    <ul>
      <li>We have no tracking cookies, no ads, not even simple statistics. We have no way of knowing if anyone is even using this, except for the OAuth rate limit counter for the Google OAuth 2.0 Client ID.</li>
      <li>You settings are stored in your <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API">browser's local storage</ExternalLink>. This information never leaves the browser.</li>
      <li>The only cookies used are the ones set and managed by the Google Client libraries.</li>
    </ul>
  </PolicyPage>
)
