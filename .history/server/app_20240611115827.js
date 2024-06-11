require('dotenv').config();

// Modules ->

const
    githubModule = require("./src/github-utils"),
    gitlabModule = require("./src/gitlab-utils");



function migrateIssues() {
    gitlabModule.getAllGroups()
    .then(groups => {
        let projectPromises = [];
        for(let group = 0; group < groups.length; group++) {
            projectPromises.push(
                gitlabModule.getAllProjects
            )
        }
    })
}