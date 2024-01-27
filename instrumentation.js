import { isLocalDev } from './server/src/helpers/logging';

//[SemanticResourceAttributes.SERVICE_VERSION]: 'develop',
//  [SemanticResourceAttributes.SERVICE_NAME]: 'local-otel-graphql-coolboard-rob',

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
