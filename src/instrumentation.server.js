import { dev } from "$app/environment";
import { env } from "$env/dynamic/public";

console.log("dev", dev);
console.log("process.env", process.env.PUBLIC_APPINSIGHTS_CONNECTION_STRING);
console.log("$env/dynamic/public", env.PUBLIC_APPINSIGHTS_CONNECTION_STRING);
