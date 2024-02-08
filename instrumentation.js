import { isLocalDev } from './server/src/helpers/logging';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { register } = await import('./server/instrumentation-node');
    register();

    isLocalDev && console.log('otel+instana node loaded');
    return;
  }

  const { register } = await import('./server/instrumentation-edge');
  register();

  isLocalDev && console.log('otel+instana edge loaded');
}
