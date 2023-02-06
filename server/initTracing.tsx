'use strict';

require('@opentelemetry/api');

const opentelemetry = require('@opentelemetry/sdk-node');
const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');

// For troubleshooting, set the log level to DiagLogLevel.DEBUG
const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const nodeAutoInstrumentations = getNodeAutoInstrumentations();

const sdk = new opentelemetry.NodeSDK({
  instrumentations: [nodeAutoInstrumentations],
});

export async function startTracing() {
  return sdk
    .start()
    .then(() => console.log('Tracing initialized'))
    .catch((error) => console.log('Error initializing tracing', error));
}
