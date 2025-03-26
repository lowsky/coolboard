// Based on
// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import {
  CompositePropagator,
  W3CBaggagePropagator,
  W3CTraceContextPropagator,
} from '@opentelemetry/core';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';

import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { registerInstrumentations } from '@opentelemetry/instrumentation';

const serviceName = process.env.NEXT_PUBLIC_OTEL_SERVICE_NAME;

// e.g. http://localhost:4318/v1/traces
const otelEndpoint = process.env.NEXT_PUBLIC_OTEL_EXPORTER_OTLP_TRACES_ENDPOINT;
//const otelInstaKey = process.env.NEXT_PUBLIC_OTEL_EXPORTER_OTLP_INSTA_KEY;

export const instrumentBrowserOtel = async () => {
  if (!serviceName || !otelEndpoint) return;

  const { ZoneContextManager } = await import('@opentelemetry/context-zone');

  const tracerProvider = new WebTracerProvider({});

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
