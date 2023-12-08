import { githubToken, getIssues } from './utils'

async function run() {
    const token = githubToken()

    console.log('token', token)
    const issues = await getIssues()

    console.log('issues', issues)
}


run()