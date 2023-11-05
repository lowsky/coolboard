'use strict';
import { isLocalDev } from './src/helpers/logging';

// Import the Instana OpenTelemetry Exporter
const { InstanaExporter } = require('@instana/opentelemetry-exporter');

import { NodeSDK } from '@opentelemetry/sdk-node';
import { Resource } from '@opentelemetry/resources';

// something like jaeger, see https://opentelemetry.io/docs/instrumentation/js/exporters/
// localhost:16686/search?limit=20&lookback=5m&service=otel-graphql-coolboard
//import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';

import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base';

const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');

diag.setLogger(
  new DiagConsoleLogger(),
  // For troubleshooting, set the log level to DiagLogLevel.DEBUG
  isLocalDev ? DiagLogLevel.INFO : DiagLogLevel.WARN
);

const autoInstrumentations = getNodeAutoInstrumentations({
  '@opentelemetry/instrumentation-fs': { enabled: false },
});

const sdk = new NodeSDK({
  // add more details when running in cloud
  autoDetectResources: !isLocalDev,
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'otel-graphql-coolboard',
  }),
  traceExporter: isLocalDev
    ? /*
    ? new OTLPTraceExporter({
        // optional - default url is http://localhost:4318/v1/traces
        // url: 'http://localhost:4318/v1/traces',
        // optional - collection of custom headers to be sent with each request, empty by default
        headers: {},
      })
     */
      new ConsoleSpanExporter()
    : //
      // Creates the Instana Exporter.
      //
      // Make sure to provide the agent key and backend endpoint URL environment variables:
      // * INSTANA_AGENT_KEY
      // * INSTANA_ENDPOINT_URL
      new InstanaExporter(),
  instrumentations: [...autoInstrumentations],
});

export async function startTracing() {
  sdk.start();
  console.log('OTel initialized 3');
}
