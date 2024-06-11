require('dotenv').config();

const headers = {
    'PRIVATE-TOKEN:': process.env.gitlabToken
}

function getAllGroups() {
    return axios.get(`${process.env.gitlabBaseUrl}/groups`, {headers})
    .then(response => response.data)
    .catch(e => {
        console.error(e , " ::getAllGroups Function")
    })
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