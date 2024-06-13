require('dotenv').config();

// Modules
const githubModule = require("./src/github-utils");
const gitlabModule = require("./src/gitlab-utils");
const { execSync } = require("child_process");

function migrateGitRepos() {
    return gitlabModule.getAllGroups()
        .then(groups => {
            let projectPromises = groups.map(group => {
                
                if (group.path != "shachar9") return;
                return gitlabModule.getAllProjects(group.id)
                    .then(projects => {
                        let repoPromises = projects.map(project => {

                            // if (project.name !== "Shachar Test") return Promise.resolve();
                            return githubModule.createRepo(group.name, project.name)
                                .then(createdRepo => {
                                    console.log(`*:: Created Repo: ${project.name}`)
                                    const gitMigrationConfig = {
                                        gitlabRepoUrl: `https://gitlab.com/${group.path}/${project.name}.git`,
                                        githubRepoUrl: `https://github.com/${group.name}/${project.name}.git`,
                                        sshGithubRepoUrl: `git@github.com:${process.env.githubOwner}/${project.name}.git`,
                                        sshGitlabRepoUrl: `git@gitlab.com:${group.path}/${project.path}.git`,
                                        repoName: project.name,
                                        orgName: group.path
                                    };
                                    return handleCodeMigration(gitMigrationConfig);
                                });
                        });
                        return Promise.all(repoPromises);
                    });
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
    console.log(migrationConfig.sshGitlabRepoUrl)
    return new Promise((resolve, reject) => {
        try {
            const response = execSync(`${__dirname}/src/git.sh '${migrationConfig.sshGitlabRepoUrl}' '${migrationConfig.sshGithubRepoUrl}' ${migrationConfig.repoName}`);
            console.log(`Migration completed for ${migrationConfig.repoName}`);
            resolve(response.toString());
        } catch (error) {
            reject(`Failed to migrate ${migrationConfig.repoName}: ${error.message}`);
        }
    });
}

function migrateIssues() {
    return gitlabModule.getAllGroups()
        .then(groups => {
            let projectPromises = groups.map(group => {
                return gitlabModule.getAllProjects(group.id)
                    .then(projects => {
                        let issuePromises = projects.map(project => {
                            
                            return gitlabModule.getAllIssues(project.id)
                                .then(issues => {
                                    let createdIssuePromises = issues.map(issue => {
                                        return githubModule.createGithubIssue(issue, group.path, project.name);
                                    });
                                    return Promise.all(createdIssuePromises);
                                });
                        });
                        return Promise.all(issuePromises);
                    });
            });
            return Promise.all(projectPromises);
        })
        .then(() => {
            console.log("Issue Migration Completed.");
        })
        .catch(error => {
            console.error("Error during Issue Migration:", error);
        });
}

githubModule.cleanUp().then(() => {
    console.log("---------------- Clean up completed.")
    migrateGitRepos()
        .then(() => migrateIssues())
        .catch(error => console.error("Error during migration:", error));
})

