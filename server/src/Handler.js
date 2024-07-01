require("dotenv").config();

const 
    githubModule = require("./github-utils"),
    gitlabModule = require("./gitlab-utils"),
    { execSync } = require("child_process"),
    gitReposJson = require("./git-repos.json"); // list of git repos mapped by lumenis for mapping new groups and repos.

function migrateGitRepos() {
    return gitlabModule.getAllGroups()
        .then(groups => {
            let projectPromises = groups.map(group => {

                return gitlabModule.getAllProjects(group.id)
                    .then(projects => {
                        let repoPromises = projects.map(project => {

                            let newOrgData = gitReposJson.filter(item => item["Group"].trim() === group.name && item["Repo"].trim() == project.name);

                            newOrgData.forEach(item => {
                                item["New repo name"] = item["New repo name"] ? item["New repo name"].trim() : item["Repo"].trim()

                            })    
                                newOrgData = newOrgData[0]
                                console.log(newOrgData)
                            // return githubModule.createRepo(newOrgData["New Org"], project.name)
                            //     .then(createdRepo => {
                            //         console.log(`*:: Created Repo: ${project.name}`)
                            //         const gitMigrationConfig = {
                            //             gitlabRepoUrl: `https://oauth2:${process.env.gitlabToken}@${process.env.GITLAB_SERVER_NAME}/${group.path}/${project.name}.git`,
                            //             githubRepoUrl: `https://github.com/${newOrgData["New Org"]}/${project.name}.git`,
                            //             sshGithubRepoUrl: `git@github.com:${process.env.githubOwner}/${project.name}.git`,
                            //             sshGitlabRepoUrl: `https://oauth2:${process.env.gitlabToken}@${process.env.GITLAB_SERVER_NAME}/${group.path}/${project.name}.git`,
                            //             repoName: project.name,
                            //             orgName: group.path
                            //         };
                            //         return handleCodeMigration(gitMigrationConfig);
                            //     });
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
            const response = execSync(`${__dirname}/git.sh '${migrationConfig.sshGitlabRepoUrl}' '${migrationConfig.sshGithubRepoUrl}' ${migrationConfig.repoName}`);
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

module.exports = {
    migrateIssues,
    migrateGitRepos
}