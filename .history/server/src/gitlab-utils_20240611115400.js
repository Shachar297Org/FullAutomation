require('dotenv').config();

const headers = {
    'PRIVATE-TOKEN:': process.env.gitlabToken
}

function getAllGroups() {
    return axios.get(`${process.env.gitlabBaseUrl}/groups`, {headers})
    .then(response => response.data)
    .catch(e => {
        console.error(e , " *::getAllGroups Function");
    });
}

function getAllProjects(groupId) {
    return axios.get(`${process.env.gitlabBaseUrl}/groups/${groupId}/projects`, {headers})
    .then(response => response.data)
    .catch(e => {
        console.error(e , " *::getAllProjects Function");
    });
}

function getAllIssues() {
    return axios.get(`${gitlabApiUrl}/projects/${projectId}/issues`, { headers })
    .then(response => response.data)
    .catch(error => {
      console.error(`Error fetching GitLab issues for project ${projectId}:`, error);
      return [];
    });
}

module.exports = {
    getAllIssues,
    getAllProjects,
    getAllGroups
}