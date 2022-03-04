import { ExternalLink } from '../utils';
import { PolicyPage } from './PolicyPage';
import { Link } from "react-router-dom";


export const TermsOfServicePage = () => (
  <PolicyPage title="Terms of Service">
    <h4>Last updated: 04 March 2022</h4>

    By using MultiMeet service, you agree to these terms. Any changes to this document will be communicated through a pull request(PR)
    in our repo. PR will be open to anyone to comment. The changes will be applied upon the merge of said PR.
    If you wish to exercise your right to reject such changes, you should stop using the service.

    <h3>The Service</h3>
    MultiMeet will access the following data:
    <ul>
      <li>Your Google profile. This is part of the Google login flow, and MultiMeet use it to
          show who is currently logged in.</li>
      <li>MultiMeet will list your Google calendars, when accessing the settings menu, so you can
          pick which calendar to show.</li>
      <li>MultiMeet will access the content of the selected Google calendar to show you a list of
          meetings for today.</li>
    </ul>
    All your data stays in your browser, and is never saved anywhere. All data is accessed read-only, and MultiMeet <i>can't</i> alter
    any of your data in any way.

    <h3>Access to the service</h3>
    <span>The service is provided without an account and free of charge.</span>

    <h3>Privacy</h3>
    <p>
    We want you to remain anonymous when using our service, and it is therefore our policy to never
    store any activity logs or metadata and to have as minimal data retention as possible. However,
    to access Google service we use OAuth API wich requires you to login using your Google account.
    We do not log or retain that information at any point.
    </p>

    <p>For more information, please read our <Link to='/privacy'>Privacy Policy</Link>.</p>

    <p>
    We host our data at <ExternalLink href="https://www.netlify.com/">Netlify</ExternalLink>. Please read 
    their privacy policy and compliance pages to understand what and how they process when you visit
    our site: <ExternalLink href="https://www.netlify.com/privacy"/> and <ExternalLink href="https://www.netlify.com/gdpr-ccpa"/>.
    </p>

    <p>
    We use GitHub to communicate with our users and host our code. Please
    read <ExternalLink href="https://docs.github.com/en/github/site-policy/github-terms-of-service"/> before
    accessing our repository.
    </p>

    <h3>Disclaimers</h3>
    Multimeet team reserves the right to modify the service by updating the software or making
    changes to certain features. We will attempt to prevent interruptions and defects in the 
    service and on our website. Despite our best efforts, the service is provided on an "as is" 
    and "as available" basis, and we do not guarantee that the service will be available at all
    times, nor the accuracy of the service or any material provided by the service or on the 
    MultiMeet website. You are solely responsible for your use of the service.

    <h3>Applicable law and venue</h3>
    The terms shall be construed in accordance with and governed by the substantive laws of
    Sweden. Any dispute, controversy, or claim arising out of or in connection with the terms
    shall be handled by the National Board for Consumer Disputes (ARN) or the Swedish courts,
    with the city of Stockholm's district court as the court of first instance.

    <h3>Contact information</h3>
    Please use GitHub issues in our repository for all comments, questions and issues: <ExternalLink href="https://github.com/parmus/multimeet/issues"/>
  </PolicyPage>
)
