// LATER: re-enable OTEL: import { startTracing } from '../../server/openTelemetry';
/*
LATER: evaluate vercel solution:

//import { registerOTel } from '@vercel/otel';

//fails while importing
//import pkg from '@opentelemetry/semantic-conventions'

export function register() {
  registerOTel('next-otel')
}
*/

export function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    require('@instana/serverless');
  }
}
