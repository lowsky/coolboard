'use strict';

import { isLocalDev } from './src/helpers/logging';

require('@opentelemetry/api');

const opentelemetry = require('@opentelemetry/sdk-node');
const { Resource } = require('@opentelemetry/resources');
const {
  SemanticResourceAttributes,
} = require('@opentelemetry/semantic-conventions');

// something like jaeger, see https://opentelemetry.io/docs/instrumentation/js/exporters/
// localhost:16686/search?limit=20&lookback=5m&service=otel-graphql-coolboard
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

// Import the Instana OpenTelemetry Exporter
const { InstanaExporter } = require('@instana/opentelemetry-exporter');

import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { GraphQLInstrumentation } from '@opentelemetry/instrumentation-graphql';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';

const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');

diag.setLogger(
  new DiagConsoleLogger(),
  // For troubleshooting, set the log level to DiagLogLevel.DEBUG
  isLocalDev ? DiagLogLevel.INFO : DiagLogLevel.WARN
);

const sdk = new opentelemetry.NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'otel-graphql-coolboard',
  }),
  traceExporter: isLocalDev
    ? new OTLPTraceExporter({
        // optional - default url is http://localhost:4318/v1/traces
        // url: 'http://localhost:4318/v1/traces',
        // optional - collection of custom headers to be sent with each request, empty by default
        headers: {},
      })
    : // Instantiate the Instana Exporter.
      // Make sure to provide the agent key and backend endpoint URL environment variables:
      // * INSTANA_AGENT_KEY
      // * INSTANA_ENDPOINT_URL
      new InstanaExporter(),
  instrumentations: [
    new HttpInstrumentation(),
    new GraphQLInstrumentation(),
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-fs': { enabled: false },
    }),
  ],
})
  .start()
  .then(() => console.log('Tracing initialized'));

export async function startTracing() {
  return sdk.catch((error) => console.log('Error initializing tracing', error));
}
