import { isLocalDev } from './server/src/helpers/logging';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { register } = await import('./server/instrumentation-node');
    register();

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isLocalDev && console.log('otel+instana node loaded');
    return;
  }

  const { register } = await import('./server/instrumentation-edge');
  register();

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  isLocalDev && console.log('otel+instana edge loaded');
}
