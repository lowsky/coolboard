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
import { isLocalDev } from './server/src/helpers/logging';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    require('@instana/serverless');
    const otel = await import('./server/openTelemetry');
    const { startTracing } = otel;

    await startTracing();

    isLocalDev && console.log(' instana instrumentation loaded');
  }
}
