const disabled = process.env.DISABLE_INSTANA === 'true';

if (!disabled) {
  require('@instana/collector')({
    debug: true,
    reportUnhandledPromiseRejections: true,
    autoProfile: true, // currently in beta
  });
}
