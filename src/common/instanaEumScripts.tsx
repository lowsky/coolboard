import Script from 'next/script';

const NEXT_PUBLIC_INSTANA_EUM_KEY = process.env.NEXT_PUBLIC_INSTANA_EUM_KEY;
const NEXT_PUBLIC_REPORTING_URL = process.env.NEXT_PUBLIC_REPORTING_URL;

export const InstanaEumScripts = () => (
  <>
    <Script strategy="afterInteractive" id="eum-init">
      {`
          (function(s,t,a,n){s[t] || (s[t] = a, n = s[a] = function() {
            n.q.push(arguments)
          },
          n.q = [], n.v = 2, n.l = 1 * new Date)})(window,'InstanaEumObject','ineum');

          ineum('reportingUrl', '${NEXT_PUBLIC_REPORTING_URL}');
          ineum('key', '${NEXT_PUBLIC_INSTANA_EUM_KEY}');
          ineum('trackSessions');
      `}
    </Script>
    <Script
      strategy="afterInteractive"
      id="eum"
      crossOrigin="anonymous"
      src={`${NEXT_PUBLIC_REPORTING_URL}/eum.min.js`}
      defer
    />
  </>
);
