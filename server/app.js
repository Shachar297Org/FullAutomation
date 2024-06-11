require('dotenv').config();

// Modules ->

const
    githubModule = require("./src/github-utils"),
    gitlabModule = require("./src/gitlab-utils"),
    { exec, execSync, spawn } = require("child_process");


function migrateGitRepos() {
    gitlabModule.getAllGroups()
        .then(groups => {
            let projectPromises = [];
            groups.forEach(group => {
                projectPromises.push(
                    gitlabModule.getAllProjects(group.id)
                        .then(projects => {
                            let repoPromises = [];
                            projects.forEach(project => {

                                if(project.name != "Shachar Test") return;

                                repoPromises.push(
                                    githubModule.createRepo(group.name, project.name)
                                        .then(createdRepo => {
                                            let gitMigrationConfig = {
                                                gitlabRepoUrl: ``, // Fill in with GitLab repo URL
                                                githubRepoUrl: ``, // Fill in with GitHub repo URL
                                                repoName: project.name,
                                                orgName: group.name
                                            };
                                            return handleCodeMigration(gitMigrationConfig);
                                        })
                                );
                            });
                            return Promise.all(repoPromises);
                        })
                );
            });
            return Promise.all(projectPromises);
        })
        .then(() => {
            console.log("Repositories migration completed.");
        })
        .catch(error => {
            console.error("Error during repositories migration:", error);
        });
}

function handleCodeMigration(migrationConfig) {
    return new Promise((resolve, reject) => {
        try {
            // Execute migration script
            const response = execSync(`${__dirname}/git.sh '${migrationConfig.gitlabRepoUrl}' '${migrationConfig.githubRepoUrl}' ${migrationConfig.repoName}`);
            resolve(response.toString());
        } catch (error) {
            reject(error);
        }
    });
}


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
                                
                                if(project.name != "Shachar Test") return;

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


migrateGitRepos()
    .then(() => migrateIssues())
    .catch(error => console.error("Error during migration:", error));