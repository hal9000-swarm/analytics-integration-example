
const fs = require('fs');

module.exports = function (cacheLocation) {
    const beforeCacheAccess = (cacheContext) => {
        return new Promise((resolve, reject) => {
            if (fs.existsSync(cacheLocation)) {
                fs.readFile(cacheLocation, "utf-8", (err, data) => {
                    if (err) {
                        reject();
                    } else {
                        cacheContext.tokenCache.deserialize(data);
                        resolve();
                    }
                });
            } else {
               fs.writeFile(cacheLocation, cacheContext.tokenCache.serialize(), (err) => {
                    if (err) {
                        reject();
                    }
                });
            }
        });
    }

    const afterCacheAccess = (cacheContext) => {
        return new Promise((resolve, reject) => {
            if(cacheContext.cacheHasChanged){
                fs.writeFile(cacheLocation, cacheContext.tokenCache.serialize(), (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
            } else {
                resolve();
            }
        });
    };


    return {
        beforeCacheAccess,
        afterCacheAccess
    }
}
