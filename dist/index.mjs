import * as action from '@actions/core';
import * as github from '@actions/github';

function githubToken() {
  return action.getInput("token");
}
async function getIssues() {
  const octokit = github.getOctokit(githubToken());
  const issues = await octokit.rest.issues.listForRepo({
    state: "all",
    sort: "updated",
    per_page: 100,
    page: 1,
    ...github.context.repo
  });
  return issues.data;
}

async function run() {
  const token = githubToken();
  console.log("token", token);
  const issues = await getIssues();
  console.log("issues", issues);
}
run();
