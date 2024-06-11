require('dotenv').config();

function getAllGroups() {
    return axios.get(`${process.env.gitlab}`)
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