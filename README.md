# Data Analytics Integration

This repository contains example code that highlights how to integrate Swarm data analytics into your own application. It showcases
- how to handle the required authentication (based on the credentials that you have received -- Client ID & Secret).
- how to perform arbitrary queries (which can be simply copy and pasted from an existing widget for an easy start).


This code makes of use https://github.com/AzureAD/microsoft-authentication-library-for-js and https://expressjs.com/. In particular it is based on the MSAL 2.0 examples, and those can also be used as a starting point for further adaptions or other approaches.

https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-overview#languages-and-frameworks lists further libraries for various programming languages that can be used to simplifiy integration and authenticate against the Swarm Data Analytics API.


# Build

```
docker build . -t analytics-example
```

## Run
CLIENT_ID = The application ID in Azure AD
CLIENT_SECRET = The secret
```
 docker run -e CLIENT_ID=<clientid> -e CLIENT_SECRET=<secret> -p 127.0.0.1:8080:8080 -d analytics-example
```

This makes the API available (only from localhost) at port 8080.

## Usage

Invoke 
```
http://localhost:8080/?query=<query>
```
and supplied an URL encoded query. As a starting point, a query can be copied from the Data Analytics "try-this" dialog.

Example:
```
http://localhost:8080/?query=https://your-data-analytics-api-4044b5d1.azurewebsites.net/cubejs-api/v1/load?query=%7B%22measures%22:%5B%22ParkingUtilization.free%22,%22ParkingUtilization.occupied%22,%22ParkingUtilization.capacity%22%5D,%22dimensions%22:%5B%5D,%22segments%22:%5B%5D,%22filters%22:%5B%7B%22operator%22:%22equals%22,%22member%22:%22ParkingUtilization.sceneId%22,%22values%22:%5B%22cf147283-a890-4918-b07e-8abe2ab483d1%22%5D%7D%5D,%22timeDimensions%22:%5B%5D,%22order%22:%7B%7D,%22timezone%22:%22Etc/ETC%22%7D&queryType=multi
```

## Possible Next Steps
- Integrate the data API into your own backend.
- Customize queries in order to drill down to data relevant for you.
- Extend the example with predefined queries, build a view in JS and populate it with query results (https://expressjs.com/en/guide/using-template-engines.html).
- Many more :-)


