require("dotenv").config();

const
    axios = require("axios"),
    headers = require("./headers")

function createRepo(org, repoName) {
    org = process.env.githubOwner
    const repoData = {
        name: repoName,
        auto_init: true
    },
        method = "POST",
        apiEndpoint = `${process.env.githubBaseUrl}/orgs/${org}/repos`


    return axios.post(`${apiEndpoint}`, repoData, { headers: headers(apiEndpoint, method) })
        .catch(error => {
            console.error(`*::createRepo `, error, org, repoName);
        });
}

function getRepoByName(repoName) {

    const
        apiEndpoint = `${process.env.githubBaseUrl}/repos/${process.env.githubOwner}/${repoName}`,
        method = "GET";

    return axios.get(`${apiEndpoint}`, { headers: headers(apiEndpoint, method) })
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
        labels: issue.labels,
        state: issue.state || 'open'
    },
        apiEndpoint = `${process.env.githubBaseUrl}/repos/${process.env.githubOwner}/${repoName}/issues`,
        method = `POST`;

    return axios.post(`${apiEndpoint}`, issueData, { headers: headers(apiEndpoint, method) }).then(res => {
        console.log(`Issue Created in repo ${repoName}`)
        return res
    })
        .catch(error => {
            console.error(`Error creating GitHub issue in repo ${repoName}:`, error.response.data);
        });
}

function getAllRepos() {
    const
        apiEndpoint = `${process.env.githubBaseUrl}/orgs/${process.env.githubOwner}/repos`,
        method = "GET";

    return axios.get(`${apiEndpoint}`, { headers: headers(apiEndpoint, method) })
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

function deleteRepo(repoName) {
    const
        apiEndpoint = `${process.env.githubBaseUrl}/repos/${process.env.githubOwner}/${repoName}`,
        method = "DELETE";

    return axios.delete(`${apiEndpoint}`, { headers: headers(apiEndpoint, method) })
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

function cleanUp() {
    return getAllRepos().then(repos => {
        let deletePromises = repos.map(repo => {
            return deleteRepo(repo.name).then(res => {
                console.log(repo.name + " Deleted.")
            }).catch(e => {
                console.log(`error deleting repo ${repo.name}`);
            })
        })
        return Promise.all(deletePromises)
    }).catch(e => {
        console.log(`*::CleanUp [getAllRepos] error: ${e}`)
    })
}

module.exports = {
    createRepo,
    getRepoByName,
    createGithubIssue,
    cleanUp
}