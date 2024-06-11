require('dotenv').config();

const headers = {
    'PRIVATE-TOKEN:': process.env.gitlabToken
}

function getAllGroups() {
    return axios.get(`${process.env.gitlabBaseUrl}/groups`, {headers})
    .then(response => response.data)
    .catch(e => {
        console.error(" *::getAllGroups Function", e);
        return []
    });
}

function getAllProjects(groupId) {
    return axios.get(`${process.env.gitlabBaseUrl}/groups/${groupId}/projects`, {headers})
    .then(response => response.data)
    .catch(e => {
        console.error(" *::getAllProjects Function ", e);
    });
}

function getAllIssues(projectId) {
    return axios.get(`${process.env.gitlabBaseUrl}/projects/${projectId}/issues`, { headers })
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