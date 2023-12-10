# issue2md 

# inputs

token: secrets.GITHUB_TOKEN

filename: the filename which will be generated. default -> README

title: the title. default -> Issues

# example

```
name: example

on:
    issues:
        types: [opened, edited, closed, reopened]
    issue_comment:
        types: [created, edited, deleted]
    
jobs:
    issue2md:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v3
            - uses: sxy15/issue2md-action@main
              with:
                token: ${{ secrets.GITHUB_TOKEN }}
```

generate

# Issues
| title | updated_at |
| --- | --- |
| [test](https://github.com/sxy15/issue2md-action/issues/1) | 2023-12-09T16:14:16Z |
