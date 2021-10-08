import { Container } from "semantic-ui-react";
import { trackPage } from "../src/common/tracking";

export default function Privacy() {
  trackPage("privacy");

  return <Container>
  <h1>Privacy Policy</h1>

  <h1>An overview of data protection</h1>
  <h2>General</h2>
  <p>
    At <b>coolboard</b> one of our main priorities is the privacy of our users.
    This Privacy Policy document contains types of information that is collected and recorded by coolboard and how we
    use it.
  </p>

  <p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact
    us through email at coolboard @ protonmail.com</p>

  <p>The following gives a simple overview of what happens to your personal information when you visit our website.
    Personal information is any data with which you could be personally identified.
    Detailed information on the subject of data protection can be found in our privacy policy found below.
  </p>

  <h2>Data Collection on our website</h2>
  <h3>Analytics and third-party tools</h3>
  <p>For getting information about which other web pages have links to Coolboard, we are using <b>mixpanel</b> which is
    full GDPR compliant. For further details, please see their pages about <a
      href="https://mixpanel.com/legal/dpa/">DPA</a> or
    their <a href="https://mixpanel.com/legal/terms-of-use/">terms-of-use</a>.
  </p>
  <p>
    When visiting our website, statistical analyses may be made of your surfing behavior
    This happens primarily using cookies and analytics.
    However, being hosted at vercel.com, when you visit www.coolboard.fun, Vercel [US]
    collects log files and uses cookies.
    You can learn more about it here:
    {/*
    <a href="https://www.netlify.com/privacy/privacy.js">Netlify Privacy Policy</a>
    */}
    {<a target="_blank" rel="noopener" href="https://vercel.com/legal/privacy-policy">Vercel Privacy Policy</a>}
  </p>
  <p>
    The analysis of your surfing behavior is usually anonymous, i.e. we will not be able to identify you from this data.
    You can object to this analysis or prevent it by not using certain tools.
    Detailed information can be found in the following privacy policy.
  </p>
  <p>Note that www.coolboard.fun has no access to or control over these cookies and log files
    that are used by Vercel nor Auth0.</p>

  <p>You can choose to disable cookies through your individual browser options. To know more detailed information about
    cookie management with specific web browsers, it can be found at the browsers&apos; respective websites.
  </p>

  <h2>Consent</h2>

  <p>By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions as well as to
    the <a target="_blank" rel="noopener" href="https://auth0.com/privacy">Auth0 Privacy & Cookie Policy</a> and Vercel Privacy Statement and to its
    Terms and Conditions.
  </p>

  <h2>Your entered data</h2>

  <p>
    If you like to work with this demo application, you need to supply some information for creating your own account
    by signing-in via a pop-up dialog using <a target="_blank" rel="noopener" href="https://auth0.com/">Auth0</a> service.
    The supplied data include:
    <br/>
    name, first name, avatar-url, email
    <br/>

    All this information could be visible in this application to other users, - if you share your created board with
    them or - enter data on any other shared board.

    They are also stored by auth0 and prisma to provide this service and is subject to the
    <a target="_blank" rel="noopener" href="https://auth0.com/privaycy">Auth0 Privacy Statement</a> and

    {/*<a target="_blank" rel="noopener" href="https://www.netlify.com/privacy/privacy.js">Netlify Privacy Policy</a>.*/}
    <a target="_blank" rel="noopener" href="https://vercel.com/legal/privacy-policy">Vercel Privacy Policy</a>.
    Please see their Statement and rules for details.
    <br/>
    Furthermore these data are transferred by a backend service running on digital ocean, Inc with their
    <a target="_blank" rel="noopener" href="https://www.digitalocean.com/legal/data-processing-agreement/">digitalocean DPA</a>.
    <br/>
    For monitoring data are transferred from the browser to instana
    <a target="_blank" rel="noopener" href="https://www.instana.com/security/">instana privacy</a>.
  </p>

  <p>Our team members could lookup this information in case of any technical issues to avoid data loss or when we need
    to transfer your data to a different page
    under same policy rules, or to inform you in these cases.
  </p>

  <h2>Contact</h2>
  <p>In case of any questions, do not hesitate to ask for support by <b>E-Mail:</b> coolboard @ protonmail.com</p>

  </Container>
}
