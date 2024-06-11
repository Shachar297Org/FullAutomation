require('dotenv').config();

// Modules ->

const
    githubModule = require("./src/github-utils"),
    gitlabModule = require("./src/gitlab-utils");



function migrateIssues() {
    gitlabModule.getAllGroups().then(groups => {
        let projectPromises = [];
        for(let group = 0; group < groups.length; group++) {
            let gitHubRepoId;
            projectPromises.push(
                gitlabModule.getAllProjects(groups[group].id).then(projects => {
                    let issuePromises = [];
                    for(let project = 0; project < projects.length; project++) {
                        githubModule.getRepoByName(projects[project].name).then(gitHubRepo => {
                            gitHubRepoId = gitHubRepo.id;
                            gitlabModule.getAllIssues(projects[project].id).then(issues => {
                                let createdIssuePromise = [];
                                for(let issue = 0; issue < issues.length; issue++) {
                                    githubModule.createGithubIssue(issue, groups[group].path, projects[project].name)
                                }
                                return Promise.all(c)
                            })
                        })
                    }
                })
            )
        }
    })
}