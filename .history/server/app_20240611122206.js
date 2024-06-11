require('dotenv').config();

// Modules ->

const
    githubModule = require("./src/github-utils"),
    gitlabModule = require("./src/gitlab-utils");



function migrateIssues() {
    gitlabModule.getAllGroups().then(groups => {
        let projectPromises = [];
        for(let group = 0; group < groups.length; group++) {
            projectPromises.push(
                gitlabModule.getAllProjects(groups[group].id).then(projects => {
                    let issuePromises = [];
                    for(let project = 0; project < projects.length; project++) {
                        githubModule.getRepoByName(projects[project].name).then()
                        gitlabModule.getAllIssues(projects[project].id).then(issues => {

                        })
                    }
                })
            )
        }
    })
}