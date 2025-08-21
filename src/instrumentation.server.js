import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-grpc";
import { AzureMonitorMetricExporter, AzureMonitorTraceExporter } from "@azure/monitor-opentelemetry-exporter";
import { dev } from "$app/environment";
import { env } from "$env/dynamic/public";

console.log("dev", dev);
console.log("process.env", process.env.PUBLIC_APPINSIGHTS_CONNECTION_STRING);
console.log("$env/dynamic/public", env.PUBLIC_APPINSIGHTS_CONNECTION_STRING);

const traceExporter = dev
    ? new OTLPTraceExporter()
    : new AzureMonitorTraceExporter({
        connectionString: env.PUBLIC_APPINSIGHTS_CONNECTION_STRING,
    });

const metricExporter = dev
    ? new OTLPMetricExporter()
    : new AzureMonitorMetricExporter({
        connectionString: env.PUBLIC_APPINSIGHTS_CONNECTION_STRING,
    });

const sdk = new NodeSDK({
    serviceName: "my-service",
    autoDetectResources: true,
    traceExporter: traceExporter,
    metricReader: new PeriodicExportingMetricReader({
        exporter: metricExporter,
    }),
    instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
