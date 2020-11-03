const fs = require("fs");

function writeDataToFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), "utf8", error => {
        if (error) console.log(error);
    });
}

function getPostData(request) {
    return new Promise((resolve, reject) => {
        try {
            let body = "";

            request.on("data", chunk => body += chunk);

            request.on("end", () => {
                resolve(body);
            });

        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    writeDataToFile,
    getPostData
};