import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { PrismaInstrumentation } from '@prisma/instrumentation';
import { registerOTel } from '@vercel/otel';

const autoInstrumentations = getNodeAutoInstrumentations({
  '@opentelemetry/instrumentation-fs': { enabled: false },
});
const instrumentations = [
  new PrismaInstrumentation({ middleware: true }),
  ...autoInstrumentations,
];

export const traceExporter = new OTLPTraceExporter({
  // default if not set via OTEL_EXPORTER_OTLP_ENDPOINT
  // url: http://localhost:4317
});

export function register() {
  registerOTel({
    serviceName: 'otel-graphql-rob',
    traceExporter,
    instrumentations,
    autoDetectResources: true,
  });
}
