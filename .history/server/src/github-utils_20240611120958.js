require("dotenv").config();

const headers = { 'Authorization': `token ${githubToken}` };

function createRepo(org, Repo) {
    const repoData = {
        name: repoName,
        auto_init: true
    }
}