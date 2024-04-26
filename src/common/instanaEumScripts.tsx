import Script from 'next/script';

const instanaEumKey = process.env.NEXT_PUBLIC_INSTANA_EUM_KEY;
const reportingUrl = process.env.NEXT_PUBLIC_REPORTING_URL;

export const InstanaEumScripts = () => {
  if (!(reportingUrl && instanaEumKey)) {
    return null;
  }

  const ignoreUrls = [/.*clerk.*/i, /.*eum.*instana.*/i, /.*localhost:43.*/i];
  // LATER remove more details: const ignoreUrls = [/.*clerk.*/i, /.*eum.*instana.*/i, /.*localhost:43.*/i];

  const branchName =
    process.env.NODE_ENV !== 'production' ? 'development' : 'production';

  return (
    <>
      <Script strategy="beforeInteractive" id="instana-eum">
        {`
          (function(s,t,a,n){s[t] || (s[t] = a, n = s[a] = function() {
            n.q.push(arguments)
          },
          n.q = [], n.v = 2, n.l = 1 * new Date)})(window,'InstanaEumObject','ineum');

          ineum('reportingUrl', '${reportingUrl}');
          ineum('key', '${instanaEumKey}');
          ineum('ignoreUrls', [${ignoreUrls}]);

          ineum('meta', 'env', '${branchName}');
      `}
      </Script>
      <Script
        strategy="beforeInteractive"
        id="eum"
        crossOrigin="anonymous"
        src={`${reportingUrl}/eum.min.js`}
        defer
      />
    </>
  );
};
