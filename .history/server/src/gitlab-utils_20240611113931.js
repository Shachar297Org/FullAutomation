require('dotenv').config();

function getAllGroups() {
    return axios.get(`${}`)
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