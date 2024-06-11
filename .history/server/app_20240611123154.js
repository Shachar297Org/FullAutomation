require('dotenv').config();

// Modules ->

const
    githubModule = require("./src/github-utils"),
    gitlabModule = require("./src/gitlab-utils");



function migrateIssues() {
    gitlabModule.getAllGroups()
        .then(groups => {
            let projectPromises = [];
            for (let group = 0; group < groups.length; group++) {
                projectPromises.push(
                    gitlabModule.getAllProjects(groups[group].id)
                        .then(projects => {
                            let issuePromises = [];
                            for (let project = 0; project < projects.length; project++) {
                                let gitLabProjectId = projects[project].id;
                                issuePromises.push(
                                    gitlabModule.getAllIssues(gitLabProjectId)
                                        .then(issues => {
                                            let createdIssuePromises = [];
                                            for (let issue = 0; issue < issues.length; issue++) {
                                                createdIssuePromises.push(
                                                    githubModule.createGithubIssue(issues[issue], groups[group].path, projects[project].name)
                                                );
                                            }
                                            return Promise.all(createdIssuePromises);
                                        })
                                );
                            }
                            return Promise.all(issuePromises);
                        })
                );
            }
            return Promise.all(projectPromises);
        })
        .then(() => {
            console.log("Issue Migration Completed.");
        })
        .catch(error => {
            console.error("Error during Issue Migration:", error);
        });
}
