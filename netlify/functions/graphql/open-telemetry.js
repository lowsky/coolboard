// Import required symbols
const { HttpInstrumentation } = require ('@opentelemetry/instrumentation-http');
const { ExpressInstrumentation } = require ('@opentelemetry/instrumentation-express');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { NodeTracerProvider } = require("@opentelemetry/node");
const { SimpleSpanProcessor, ConsoleSpanExporter } = require ("@opentelemetry/tracing");
const { Resource } = require('@opentelemetry/resources');
const { GraphQLInstrumentation } = require ('@opentelemetry/instrumentation-graphql');

// Import the Instana OpenTelemetry Exporter
const { InstanaExporter } = require('@instana/opentelemetry-exporter');

// Instantiate the Instana Exporter.
// Make sure to provide the agent key and backend endpoint URL environment variables:
// * INSTANA_AGENT_KEY
// * INSTANA_ENDPOINT_URL
const instanaTraceExporter = new InstanaExporter();



// Register server-related instrumentation
registerInstrumentations({
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
    new GraphQLInstrumentation()
  ]
});

// Initialize provider and identify this particular service
// (in this case, we're implementing a federated gateway)
const provider = new NodeTracerProvider({
  resource: Resource.default().merge(new Resource({
    // Replace with any string to identify this service in your system
    "service.name": "trello-graphql",
  })),
});

// Configure a test exporter to print all traces to the console
// const consoleExporter = new ConsoleSpanExporter();
//provider.addSpanProcessor(new SimpleSpanProcessor(consoleExporter));

provider.addSpanProcessor(new SimpleSpanProcessor(instanaTraceExporter));

// Register the provider to begin tracing
provider.register();

