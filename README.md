# Bug repro

## 1. import from "$env" is not available in `instrumentation.server.js`

When importing from `$env` in `instrumentation.server.js`, the import is not available in certain scenario's.

1. `vite dev`

Output:
```
dev true
process.env undefined
$env/dynamic/public InstrumentationKey=00000000-0000-0000-0000-000000000000;IngestionEndpoint=https://applicationinsights.azure.com/;LiveEndpoint=https://livediagnostics.monitor.azure.com/;ApplicationId= 00000000-0000-0000-0000-000000000000
```

2. `vite preview`
Output:
```
<<<EOF
```

3. `node --env-file=.env ./build`
```
dev false
process.env InstrumentationKey=00000000-0000-0000-0000-000000000000;IngestionEndpoint=https://applicationinsights.azure.com/;LiveEndpoint=https://livediagnostics.monitor.azure.com/;ApplicationId= 00000000-0000-0000-0000-000000000000
$env/dynamic/public undefined
```

## 2. Instrumentation is not loaded in `vite preview`

When running `vite preview`, the instrumentation is not loaded, even though it is available in the build output.

The log statements in `instrumentation.server.js` are not shown.
```
<<<EOF
```

## 3. Build fails without an error message

When an `instrumentation.server.js` file is present but instrumentation is not enabled in `svelte.config.js`, the build fails without any error message.

This took me a second to figure out what went wrong when setting up this repository. this happens when `experimental.instrumentation` is disabled or this property is just not present.
```
experimental: {
    instrumentation: {
        server: false,
    },
},
```

This is the full output, no actual message is shown:
```
$ npm run build

> sveltekit-otel-env-var-not-available@0.0.1 build
> vite build

error during build:

<<<EOF
```