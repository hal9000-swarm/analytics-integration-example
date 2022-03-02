
const fetch = require('node-fetch');

class HTTPResponseError extends Error {
    constructor(response, ...args) {
        super(`HTTP Error Response: ${response.status} ${response.statusText}`, ...args);
        this.response = response;
    }
}

const checkStatus = response => {
    if (response.ok) {
        return response;
    } else {
        throw new HTTPResponseError(response);
    }
}

async function getDashboardData(query, authtoken) {

    let headers = {
        "Authorization": authtoken.accessToken
    }

    const response = await fetch(query, {headers: headers})
    try {
        checkStatus(response);
        return await response.json()
    } catch (error) {
        console.error(error);
        const errorBody = await error.response.text();
        console.error(`Error body: ${errorBody}`);
        return errorBody
    }

}


module.exports = getDashboardData;
