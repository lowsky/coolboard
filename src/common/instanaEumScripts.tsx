import Script from 'next/script';

const NEXT_PUBLIC_INSTANA_EUM_KEY = process.env.NEXT_PUBLIC_INSTANA_EUM_KEY;

export const InstanaEumScripts = () => (
  <>
    <Script strategy="afterInteractive" id="eum-init">
      {`
          (function(s,t,a,n){s[t] || (s[t] = a, n = s[a] = function() {
            n.q.push(arguments)
          },
          n.q = [], n.v = 2, n.l = 1 * new Date)})(window,'InstanaEumObject','ineum');

          ineum('reportingUrl', 'https://eum-pink-saas.instana.rocks');
          ineum('key', '${NEXT_PUBLIC_INSTANA_EUM_KEY}');
          ineum('trackSessions');
      `}
    </Script>
    <Script
      strategy="afterInteractive"
      id="eum"
      crossOrigin="anonymous"
      src="https://eum.instana.io/eum.min.js"
      defer
    />
  </>
);
