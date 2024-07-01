require("dotenv").config();

const headersHandler = (url, method) => {
    let headers = {};
    if (url.indexOf("gitlab") > -1 || url.indexOf("rdgit.lumenis") > -1) {

        if (method != "GET") {
            console.error("Will not modify or create any resource under gitlab organization!");
            return;
        }
        headers["PRIVATE-TOKEN"] = process.env.gitlabToken
    } else {
        switch (method) {
            case "POST":
                headers = {
                    "Accept": "application/vnd.github+json",
                    "X-GitHub-Api-Version": "2022-11-28"
                }
                break;

            case "GET":
                break;
        }
        headers.authorization = `Bearer ${process.env.githubToken}`
    }

    return headers
}

module.exports = headersHandler