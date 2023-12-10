import { getIssues, pushCommit, getTitle, getFilename } from './utils'
import fs from 'node:fs'

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

    const md = `# ${getTitle()}
| title | updated_at |
| --- | --- |
${table}
`
    fs.writeFileSync(`${getFilename()}.md`, md, {encoding: 'utf-8'})

    pushCommit()
}

run()