require('dotenv').config();

const
    headers = require("./headers"),
    axios = require("axios"),
    method = 'GET',
    gitlabGroupNames = process.env.gitlabGroupNames.split(",");

function getAllGroups() {
    const apiEndpoint = `${process.env.gitlabBaseUrl}/groups`;
    
    return axios.get(`${apiEndpoint}`, { headers: headers(apiEndpoint, method) })
        .then(response => response.data)
        .catch(e => {
            console.error(" *::getAllGroups Function", e);
            return [];
        });
}

function getAllProjects(groupId) {
    const apiEndpoint = `${process.env.gitlabBaseUrl}/groups/${groupId}/projects`;

    return axios.get(`${apiEndpoint}`, { headers: headers(apiEndpoint, method) })
        .then(response => response.data)
        .catch(e => {
            console.error(" *::getAllProjects Function ", e);
            return [];
        });
}

function getAllIssues(projectId) {
    const apiEndpoint = `${process.env.gitlabBaseUrl}/projects/${projectId}/issues`;

    return axios.get(``, { headers: headers(apiEndpoint, method) })
        .then(response => response.data)
        .catch(e => {
            console.error(`*::getAllIssues Function `, e, projectId);
            return [];
        });
}


module.exports = {
    getAllIssues,
    getAllProjects,
    getAllGroups
}