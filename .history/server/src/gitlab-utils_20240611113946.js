require('dotenv').config();

function getAllGroups() {
    return axios.get(`${process.env.gitlabBaseUrl}/groups`)
}

function getAllProjects() {

}

function getAllIssues() {

}

module.exports = {
    getAllIssues,
    getAllProjects,
    getAllGroups
}