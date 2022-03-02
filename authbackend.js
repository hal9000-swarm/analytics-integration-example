const msal = require('@azure/msal-node');

/**
 * Command line arguments can be used to configure:
 * - The port the application runs on
 * - The cache file location
 * - The authentication scenario/configuration file name
 *
 * Provide CLIENT_ID, CLIENT_SECRET as ENV variables
 */
const argv = require("./cliArgs");

const cacheLocation = argv.c || "./data/cache.json";
const cachePlugin = require('./cachePlugin')(cacheLocation);


function init() {
    console.log("Init Authbackend ...")
    const loggerOptions = {
        loggerCallback(loglevel, message) {
            console.log(message);
        },
        piiLoggingEnabled: false,
        logLevel: msal.LogLevel.Info,
    }

    // Build MSAL ClientApplication Configuration object
    let authOptions = {
        "authority": "https://login.microsoftonline.com/360cc957-e678-48be-b62a-48915a960e9e"
    }
    authOptions.clientId = process.env.CLIENT_ID
    authOptions.clientSecret =  process.env.CLIENT_SECRET

    this.clientConfig = {
        auth: authOptions,
        cache: {
            cachePlugin
        },
        system: {
            loggerOptions,
        }
    };
    // Create msal application object
    this.confidentialClientApplication = new msal.ConfidentialClientApplication(this.clientConfig);
}

init()

function tokenfetcher() {
    // With client credentials flows permissions need to be granted in the portal by a tenant administrator.
    // The scope is always in the format "<resource>/.default"
    const clientCredentialRequest = {
        scopes: [`https://login.swarm-analytics.com/${this.clientConfig.auth.clientId}/.default`],
        azureRegion: null, // (optional) specify the region you will deploy your application to here (e.g. "westus2")
        skipCache: false, // (optional) this skips the cache and forces MSAL to get a new token from Azure AD
    };

    return this.confidentialClientApplication
        .acquireTokenByClientCredential(clientCredentialRequest)
}

/**
 * The code below checks if the script is being executed manually or in automation.
 * If the script was executed manually, it will initialize a ConfidentialClientApplication object
 * and execute the sample client credentials application.
 */
if (argv.$0 === "authbackend.js") {
    tokenfetcher().then((response) => {
        console.log(response);
        return response
    }).catch((error) => {
        console.log(JSON.stringify(error));
    });
}

module.exports = tokenfetcher;
