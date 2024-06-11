require('dotenv').config();

// Modules ->

const
    githubModule = require("./src/github-utils"),
    gitlabModule = require("./src/gitlab-utils");



function migrateIssues() {
    gitlabModule.getAllGroups
}