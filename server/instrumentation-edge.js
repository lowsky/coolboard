import { registerOTel } from '@vercel/otel';
// failing to load otel trace exporter via grpc on edge, missing tls...
//import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';

export function register() {
  registerOTel({
    serviceName: 'next-otel-graphql-rob',
  });
}
