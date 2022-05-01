import Script from 'next/script';

export const InstanaEumScripts = () => (
  <>
    <Script strategy="afterInteractive" id="eum-init">
      {`
          (function(s,t,a,n){s[t] || (s[t] = a, n = s[a] = function() {
            n.q.push(arguments)
          },
          n.q = [], n.v = 2, n.l = 1 * new Date)})(window,'InstanaEumObject','ineum');

          ineum('reportingUrl', 'https://eum-pink-saas');
          ineum('key', 'C_tJGFlMS7WBNuGg');
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
