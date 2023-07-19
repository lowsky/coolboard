// LATER: re-enable OTEL: import { startTracing } from '../../server/openTelemetry';
/*
LATER: evaluate vercel solution:

import { registerOTel } from '@vercel/otel'

export function register() {
  registerOTel('next-app')
}
*/

export function register() {
  require('@instana/aws-lambda');
}
