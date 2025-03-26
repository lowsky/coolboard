import { isLocalDev } from './src/helpers/logging';

import { NodeSDK } from '@opentelemetry/sdk-node';

import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';

import { PrismaInstrumentation } from '@prisma/instrumentation';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');

diag.setLogger(
  new DiagConsoleLogger(),
  // For troubleshooting, set the log level to DiagLogLevel.DEBUG
  isLocalDev ? DiagLogLevel.INFO : DiagLogLevel.WARN
);

const autoInstrumentations = getNodeAutoInstrumentations({
  '@opentelemetry/instrumentation-fs': { enabled: false },
});

export const instrumentations = [
  new PrismaInstrumentation({ middleware: true }),
  ...autoInstrumentations,
];

const sdk = new NodeSDK({
  // Add more details when running in cloud
  autoDetectResources: !isLocalDev,
  instrumentations,
});

export async function startTracing() {
  sdk.start();
  console.log('OTel initialized 3');
}
