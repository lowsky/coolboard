const disabled = process.env.DISABLE_INSTANA === 'true';

if (!disabled) {
  require('@instana/collector')({
    debug: true,
    reportUnhandledPromiseRejections: true,
    tracing: false,
    autoTracing: false,
    autoProfile: false, // currently in beta
  });
}
