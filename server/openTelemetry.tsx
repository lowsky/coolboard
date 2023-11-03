'use strict';

// Import the Instana OpenTelemetry Exporter
import { Resource } from '@opentelemetry/resources';

const { InstanaExporter } = require('@instana/opentelemetry-exporter');
import { isLocalDev } from './src/helpers/logging';

const opentelemetry = require('@opentelemetry/sdk-node');

const { registerInstrumentations } = require('@opentelemetry/instrumentation');

// something like jaeger, see https://opentelemetry.io/docs/instrumentation/js/exporters/
// localhost:16686/search?limit=20&lookback=5m&service=otel-graphql-coolboard
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

// might be obsolete: import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';

import { GraphQLInstrumentation } from '@opentelemetry/instrumentation-graphql';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';

import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base';

import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';

const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');

diag.setLogger(
  new DiagConsoleLogger(),
  // For troubleshooting, set the log level to DiagLogLevel.DEBUG
  isLocalDev ? DiagLogLevel.INFO : DiagLogLevel.WARN
);

const sdk = new opentelemetry.NodeSDK({
  autoDetectResources: false,
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
    // This was already installed.
    // getNodeAutoInstrumentations({ '@opentelemetry/instrumentation-fs': { enabled: false }, }),
  ],
});

export async function startTracing() {
  sdk.start();
  console.log('OTel initialized');
}
