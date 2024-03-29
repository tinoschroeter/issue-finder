import { Octokit, App } from "octokit";

const token = process.env.GIHUB_TOKEN;

const octokit = new Octokit({ auth: token });
const { search } = await octokit.graphql(
  `query issues($queryString: String! $skip: Int!) {
      search(first: $skip, query: $queryString, type: ISSUE) {
        issueCount
        edges {
          node {
            ... on Issue {
              url
              title
              repository {
                name
                url
                owner {
                  login
                }
              }
            }
          }
        }
      }
    }`,
  {
    queryString: 'is:open label:"good first issue" org:argoproj no:assignee',
    skip: 50,
  }
);

//console.log(JSON.stringify(search, null, 2));
console.log(`Issue count:  ${search.issueCount}`);
search.edges.forEach((issue) =>
  console.log(`Title: ${issue.node.title}\nUrl: ${issue.node.url}\n`)
);
