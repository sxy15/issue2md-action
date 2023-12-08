import { getIssues } from './utils'
import fs from 'node:fs'
import { execSync } from 'node:child_process'

async function run() {

    const issues = await getIssues()

    const tableData = issues.map(issue => {
        const { html_url, title, updated_at } = issue
        return {
            html_url,
            title,
            updated_at
        }
    })

    const table = tableData.map(item => {
        return `| [${item.title}](${item.html_url}) | ${item.updated_at} |`
    }).join('\n')

    const md = `# Issues
| title | updated_at |
| --- | --- |
${table}
`
    fs.writeFileSync('README.md', md, {encoding: 'utf-8'})

    execSync('git add .')
    execSync('git commit -m "update readme"')
    execSync('git push')
}


run()