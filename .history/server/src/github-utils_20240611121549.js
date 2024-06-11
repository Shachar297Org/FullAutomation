require("dotenv").config();

const 
    axios = require("axios"), 
    headers = { 'Authorization': `token ${githubToken}` };

function createRepo(org, Repo) {
    const repoData = {
        name: repoName,
        auto_init: true
    }
}

function getRepoByName(repoName) {
    return axios.get(`${process.env.githubBaseUrl}/repos/${process.env.githubOwner}/${repoName}`, {headers})
    .then(res => res.data)
    .catch(e => {
        console.error("*::[github module] getRepoByName ", e)
    })
}