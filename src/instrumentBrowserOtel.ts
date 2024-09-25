// Based on
// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import {
  CompositePropagator,
  W3CBaggagePropagator,
  W3CTraceContextPropagator,
} from '@opentelemetry/core';
import {
  BatchSpanProcessor,
  ConsoleSpanExporter,
  WebTracerProvider,
} from '@opentelemetry/sdk-trace-web';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { registerInstrumentations } from '@opentelemetry/instrumentation';

import { detectResourcesSync } from '@opentelemetry/resources/build/src/detect-resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { browserDetector, Resource } from '@opentelemetry/resources';

const serviceName = process.env.NEXT_PUBLIC_OTEL_SERVICE_NAME;

// e.g. http://localhost:4318/v1/traces
const otelEndpoint = process.env.NEXT_PUBLIC_OTEL_EXPORTER_OTLP_TRACES_ENDPOINT;
const otelInstaKey = process.env.NEXT_PUBLIC_OTEL_EXPORTER_OTLP_INSTA_KEY;

export const instrumentBrowserOtel = async () => {
  if (!serviceName || !otelEndpoint) return;

  const { ZoneContextManager } = await import('@opentelemetry/context-zone');

  const resource = new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
  }).merge(detectResourcesSync({ detectors: [browserDetector] }));
  const tracerProvider = new WebTracerProvider({ resource });

  const otlpTraceExporter = new OTLPTraceExporter({
    url: otelEndpoint!,
    headers: otelInstaKey ? { 'x-instana-key': otelInstaKey } : {},
  });

  // For debugging, see browser console:
  if (process.env.NEXT_OTEL_BROWSER_DEBUG) {
    tracerProvider.addSpanProcessor(
      new BatchSpanProcessor(new ConsoleSpanExporter())
    );
  }

  tracerProvider.addSpanProcessor(
    new BatchSpanProcessor(otlpTraceExporter, {
      scheduledDelayMillis: 1500,
    })
  );

  tracerProvider.register({
    contextManager: new ZoneContextManager(),
    propagator: new CompositePropagator({
      propagators: [
        new W3CBaggagePropagator(),
        new W3CTraceContextPropagator(),
      ],
    }),
  });

  registerInstrumentations({
    tracerProvider,
    instrumentations: [
      getWebAutoInstrumentations({
        '@opentelemetry/instrumentation-fetch': {
          ignoreUrls: [
            // Clerk would not work after instrumentation
            /.*clerk.*/i,
            // _next/* would add a lot of noise.
            /.*_next.*/i,
          ],
          propagateTraceHeaderCorsUrls: /.*/,
          clearTimingResources: true,
        },
      }),
    ],
  });
};
