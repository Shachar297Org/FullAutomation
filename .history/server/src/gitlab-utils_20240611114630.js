require('dotenv').config();

const headers = {
    'PRIVATE-TOKEN:': process.env.gitlabToken
}

function getAllGroups() {
    return axios.get(`${process.env.gitlabBaseUrl}/groups`, )
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