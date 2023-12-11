import * as action from '@actions/core'
import * as github from '@actions/github'
import { execSync } from 'node:child_process'

export function githubToken() {
    return action.getInput('token')
}

export function getFilename() {
    return action.getInput('filename')
}

export function getTitle() {
    return action.getInput('title')
}

export async function getIssues() {
    const octokit = github.getOctokit(githubToken())

    const issues = await octokit.rest.issues.listForRepo({
        state: 'all',
        sort: 'updated',
        per_page: 100,
        page: 1,
        ...github.context.repo
    })

    return issues.data
}

export async function getOwner() {
    const octokit = github.getOctokit(githubToken())

    const { data } = await octokit.rest.users.getByUsername({
        username: github.context.repo.owner
    })

    return {
        name: data.name || data.login,
        email: data.email
    }
}

export async function pushCommit() {
    const { name, email } = await getOwner()
    execSync(`git config --global user.name "${name}"`)
    execSync(`git config --global user.email "${email}"`)
    execSync('git add .')
    execSync('git commit -m "update readme"')
    execSync('git push')
}