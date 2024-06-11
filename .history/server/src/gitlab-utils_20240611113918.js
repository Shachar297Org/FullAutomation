require('dotenv').config();

function getAllGroups() {
    return axios.getAllGroups
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