import { getIssues } from './utils'

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
    console.log(md)
}


run()