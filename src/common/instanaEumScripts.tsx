import Script from 'next/script';

const instanaEumKey = process.env.NEXT_PUBLIC_INSTANA_EUM_KEY;
const reportingUrl = process.env.NEXT_PUBLIC_REPORTING_URL;

export const InstanaEumScripts = () => {
  if (!(reportingUrl && instanaEumKey)) {
    return null;
  }

  return (
    <>
      <Script strategy="afterInteractive" id="eum-init">
        {`
          (function(s,t,a,n){s[t] || (s[t] = a, n = s[a] = function() {
            n.q.push(arguments)
          },
          n.q = [], n.v = 2, n.l = 1 * new Date)})(window,'InstanaEumObject','ineum');

          ineum('reportingUrl', '${reportingUrl}');
          ineum('key', '${instanaEumKey}');
          ineum('trackSessions');
      `}
      </Script>
      <Script
        strategy="afterInteractive"
        id="eum"
        crossOrigin="anonymous"
        src={`${reportingUrl}/eum.min.js`}
        defer
      />
    </>
  );
};
