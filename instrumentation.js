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
    const otel = await require('./server/openTelemetry');
    const { startTracing } = otel;

    await startTracing();
    // Import the Instana OpenTelemetry Exporter
    //const { InstanaExporter } = require('@instana/opentelemetry-exporter');
    //await import('@instana/serverless');

    isLocalDev && console.log(' instana instrumentation loaded');
  }
}
