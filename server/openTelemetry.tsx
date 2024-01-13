'use strict';
import { isLocalDev } from './src/helpers/logging';

import { NodeSDK } from '@opentelemetry/sdk-node';
import { Resource } from '@opentelemetry/resources';

// something like jaeger, see https://opentelemetry.io/docs/instrumentation/js/exporters/
// http://localhost:16686/search?limit=20&lookback=5m&service=otel-graphql-coolboard
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';

import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';

import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

//import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base';
import { PrismaInstrumentation } from '@prisma/instrumentation';

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
  //
  traceExporter:
    //new ConsoleSpanExporter() ??
    new OTLPTraceExporter({
      // default if not set via OTEL_EXPORTER_OTLP_ENDPOINT
      // url: http://localhost:4317
    }),
  instrumentations: [
    new PrismaInstrumentation({ middleware: true }),
    ...autoInstrumentations,
  ],
});

export async function startTracing() {
  sdk.start();
  console.log('OTel initialized 3');
}
