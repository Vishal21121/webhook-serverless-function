const axios = require("axios").default;

exports.handler = async function (event,context) {
    try {
        const body = JSON.parse(event.body);
        const action = body.action
        const repoName = body.repository.full_name;
        let repoUrl = body.repository.html_url
        const username = body.sender.login;
        const userUrl = body.sender.url
        const avatarUrl = body.sender.avatar_url;
        let Title = ""
        let issueUrl 
        let issueTitle
        let issueDescription 
        let pullUrl 
        let pullTitle
        let pullDescription
        
        // if repo is starred
        if(action === 'created' && body.starred_at){
          Title = `${repoName} is starred ⭐⭐⭐`
        }
        //! TODO if star is removed
        if(action === "deleted" && body.starred_at == null){
          Title = `star is removed from the repo ${repoName}`
        }
        // if issue is opened
        if(action === "opened" && body.issue){
          issueUrl = body.issue.html_url
          repoUrl = body.issue.repository_url
          issueTitle = body.issue.title
          issueDescription = body.issue.body ? body.issue.body : "not provided" 
          Title = `🚩Issue has been raised in the ${repoName}. Issue title: ${issueTitle}, Issue description: ${issueDescription},Issue url: ${issueUrl}`
        }
        // if issue is closed
        else if (action === "closed"  && body.issue){
          issueUrl = body.issue.html_url
          repoUrl = body.issue.repository_url
          issueTitle = body.issue.title
          issueDescription = body.issue.body ? body.issue.body : "not provided" 
          Title = `🚩Issue has been closed in the ${repoName}.Issue title: ${issueTitle}, Issue description: ${issueDescription}, Issue url: ${issueUrl}`
        }
        // if repo is forked
        if (body.forkee){
            Title = `${repoName} is forked`
        }
        // if pull request is opened
        if(action === "opened" && body.pull_request){
          pullUrl =  body.pull_request.html_url
          pullTitle = body.pull_request.title
          pullDescription = body.pull_request.body ? body.pull_request.body : "not provided"
          Title = `Pull request Opened ✅ Title: ${pullTitle}, Description: ${pullDescription}, Pull request url: ${pullUrl}`
        }
        // if pull request is closed
        if(action === "closed" && body.pull_request){
          console.log(body.pull_request.html_url);
          pullUrl =  body.pull_request.html_url
          pullTitle = body.pull_request.title
          pullDescription = body.pull_request.body ? body.pull_request.body : "not provided"
          Title = `Pull request closed ❌ Title: ${pullTitle}, Description: ${pullDescription}, Pull request url: ${pullUrl}`
        }

        if(Title){
          const res = await axios.post(process.env.DISCORD_WEBHOOK_URL, {
            content: `${Title} by ${username} and the repo url is ${repoUrl}`,
            embeds: [{
              "title": `${username}`,
              "description": `Link of the user ${userUrl}`,
              "image": {
                "url": `${avatarUrl}`
              }
            }],
          });
          console.log("Submitted!");
          return {
            statusCode: 204,
          };
        }
        
      } catch (err) {
        return { statusCode: 500, body: err.toString() };
      }
}
