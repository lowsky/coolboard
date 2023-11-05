/*
LATER: evaluate vercel solution:

//import { registerOTel } from '@vercel/otel';

//fails while importing
//import pkg from '@opentelemetry/semantic-conventions'

export function register() {
  registerOTel('next-otel')
}
*/

import { isLocalDev } from './server/src/helpers/logging';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { startTracing } = await import('./server/openTelemetry');

    await startTracing();

    isLocalDev && console.log('otel+instana instrumentation loaded');
  }
}
