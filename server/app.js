require('dotenv').config();

// Modules
const githubModule = require("./src/github-utils");
const handler = require("./src/Handler")

// const init = () => {
//     if (process.env.IS_CLEANUP === "true") {
//         githubModule.cleanUp();
//     }
//     if (process.env.IS_MIGRATING_ISSUES === "true" && process.env.IS_MIGRATING_CODE === "true") {
//         handler.migrateGitRepos()
//             .then(() => handler.migrateIssues())
//             .catch(error => console.error("Error during migration: ", error));
//     } else if (process.env.IS_MIGRATING_ISSUES === "false" && process.env.IS_MIGRATING_CODE === "true") {
//         handler.migrateGitRepos();
//     } else if (process.env.IS_MIGRATING_ISSUES === "true" && process.env.IS_MIGRATING_CODE === "false") {
//         handler.migrateIssues();
//     }

// }

const init = () => {
    handler.migrateGitRepos();
}

init();

