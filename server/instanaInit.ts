const disabled = process.env.DISABLE_INSTANA === 'true';

if (!disabled) {
  require('@instana/collector')({
    debug: true,
    reportUnhandledPromiseRejections: true,
    tracing: {
      automaticTracingEnabled: false,
    },
    autoProfile: false, // currently in beta
  });
}
