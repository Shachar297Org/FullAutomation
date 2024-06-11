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
        if (e.response && e.response.status === 404) {
            throw new Error('Repository not found.');
          } else {
            console.error("*::[github module] getRepoByName ", e);
            throw new Error("*::[github module] getRepoByName ", e);
          }
    })
}

function createGithubIssue(issue, org, repoName) {
    const issueData = {
        title: issue.title,
        body: issue.description || '',
        labels: issue.labels
      };
    
      return axios.post(`${githubApiUrl}/repos/${org}/${repoName}/issues`, issueData, { headers })
        .catch(error => {
          console.error(`Error creating GitHub issue in repo ${repoName}:`, error);
        });
}

module.exports = {
    createRepo,
    getRepoByName
}