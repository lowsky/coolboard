import { Container, Heading, Link, Text } from '@chakra-ui/react';
import { trackPage } from '../src/common/tracking';
import { ProfileHeader } from '../src/common/ProfileHeader';
import FullPageWithApollo from '../src/common/FullPageWithApollo';

export default function Privacy() {
  trackPage('privacy');

  return (
    <FullPageWithApollo>
      <ProfileHeader />

      <Container maxW="980px">
        <Heading as="h1">Privacy Policy</Heading>

        <Heading as="h1">An overview of data protection</Heading>
        <Heading as="h2">General</Heading>
        <Text>
          At <strong>coolboard</strong> one of our main priorities is the
          privacy of our users. This Privacy Policy document contains types of
          information that is collected and recorded by coolboard and how we use
          it.
        </Text>

        <Text>
          If you have additional questions or require more information about our
          Privacy Policy, do not hesitate to contact us through email at
          coolboard @ protonmail.com
        </Text>

        <Text>
          The following gives a simple overview of what happens to your personal
          information when you visit our website. Personal information is any
          data with which you could be personally identified. Detailed
          information on the subject of data protection can be found in our
          privacy policy found below.
        </Text>

        <Heading as="h2">Data Collection on our website</Heading>
        <Heading as="h3">Analytics and third-party tools</Heading>
        <Text>
          For getting information about which other web pages have links to
          Coolboard, we are using <b>mixpanel</b> which is full GDPR compliant.
          For further details, please see their pages about{' '}
          <Link
            href="https://mixpanel.com/legal/dpa/"
            referrerPolicy="no-referrer"
            isExternal>
            DPA
          </Link>{' '}
          or their{' '}
          <Link
            href="https://mixpanel.com/legal/terms-of-use/"
            referrerPolicy="no-referrer"
            isExternal>
            terms-of-use
          </Link>
          .
        </Text>
        <Text>
          When visiting our website, statistical analyses may be made of your
          surfing behavior This happens primarily using cookies and analytics.
          However, being hosted at vercel.com, when you visit www.coolboard.fun,
          Vercel [US] collects log files and uses cookies. You can learn more
          about it here:
          <Link
            href="https://vercel.com/legal/privacy-policy"
            referrerPolicy="no-referrer"
            isExternal>
            Vercel Privacy Policy
          </Link>
        </Text>
        <Text>
          The analysis of your surfing behavior is usually anonymous, i.e. we
          will not be able to identify you from this data. You can object to
          this analysis or prevent it by not using certain tools. Detailed
          information can be found in the following privacy policy.
        </Text>
        <Text>
          Note that www.coolboard.fun has no access to or control over these
          cookies and log files that are used by Vercel nor Clerk.dev.
        </Text>

        <Text>
          You can choose to disable cookies through your individual browser
          options. To know more detailed information about cookie management
          with specific web browsers, it can be found at the browsers&apos;
          respective websites.
        </Text>

        <Heading as="h2">Consent</Heading>

        <Text>
          By using our website, you hereby consent to our Privacy Policy and
          agree to its Terms and Conditions as well as to the{' '}
          <Link
            href="https://clerk.dev/privacy"
            referrerPolicy="no-referrer"
            isExternal>
            clerk.dev Privacy Policy
          </Link>{' '}
          (contains GDPA and CalOPPA) and Vercel Privacy Statement and to its
          Terms and Conditions.
        </Text>

        <Heading as="h2">Your entered data</Heading>

        <Text>
          If you like to work with this demo application, you need to supply
          some information for creating your own account by signing-in via a
          pop-up dialog using{' '}
          <Link
            href="https://clerk.dev/"
            referrerPolicy="no-referrer"
            isExternal>
            clerk.dev
          </Link>{' '}
          service. The supplied data include:
          <br />
          name, first name, avatar-url, email
          <br />
          All this information could be visible in this application to other
          users, - if you share your created board with them or - enter data on
          any other shared board. They are also stored by clerk.dev to provide
          this service and is subject to the
          <Link
            href="https://clerk.dev/privaycy"
            referrerPolicy="no-referrer"
            isExternal>
            clerk.dev Privacy Statement
          </Link>{' '}
          and
          {/*<a target="_blank" rel="noreferrer noopener" href="https://www.netlify.com/privacy/privacy.js">Netlify Privacy Policy</a>.*/}
          <Link
            href="https://vercel.com/legal/privacy-policy"
            referrerPolicy="no-referrer"
            isExternal>
            Vercel Privacy Policy
          </Link>
          . Please see their Statement and rules for details.
          <br />
          For monitoring(currently not active), data may be transferred from the
          browser to instana:
          <Link
            href="https://www.instana.com/security/"
            referrerPolicy="no-referrer"
            isExternal>
            instana privacy
          </Link>
        </Text>

        <Text>
          Our team members could lookup this information in case of any
          technical issues to avoid data loss or when we need to transfer your
          data to a different page under same policy rules, or to inform you in
          these cases.
        </Text>

        <Heading as="h2">Contact</Heading>
        <Text>
          In case of any questions, do not hesitate to ask for support by{' '}
          <b>E-Mail:</b> coolboard @ protonmail.com
        </Text>
      </Container>
    </FullPageWithApollo>
  );
}
