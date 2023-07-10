# Webhook Serverless Function

This repository contains a serverless function that can be deployed on Netlify to act as a handler for GitHub webhooks. The function receives events sent by the GitHub webhook and creates a post request to send a message to Discord in the appropriate channel.

# Setup
To use this serverless function, follow the steps below:
1. Clone this repository to your local machine:

```bash
git clone https://github.com/Vishal21121/webhook-serverless-function.git
```
2. Install the necessary dependencies by running the following command within the cloned repository:
```bash
    npm install
```

3. Create a Discord webhook URL for your serverless function to send messages. You can find instructions on how to create a webhook URL in the [Discord documentation](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks).

4. Rename the `.env.example` file to `.env`, and update the `DISCORD_WEBHOOK_URL` variable in the file with your Discord webhook URL.

5. Deploy the serverless function to Netlify. You can use the Netlify CLI or deploy directly from your GitHub repository. Refer to the Netlify documentation for detailed instructions on deploying serverless functions.

## Configuration
In order to configure the GitHub webhook to trigger the serverless function, follow these steps:

1. Go to your GitHub repository and navigate to Settings.

2. Select Webhooks from the left menu.

3. Click on Add webhook.

4. Set the following options:

    * **Payload URL**: Enter the URL for your deployed serverless function on Netlify.
    * **Content type**: Select **application/json**.
    * **Which events would you like to trigger this webhook?**: Select the events that should trigger the serverless function. For example, you can choose to trigger the function on push events or pull request events.
5. Click on **Add webhook** to save the configuration.

## Usage
Once the serverless function is deployed and the GitHub webhook is configured, the function will automatically trigger whenever a configured event occurs in your GitHub repository.

To send a message to Discord, the function will create a pull request with the message as the pull request body. The message will be sent to the appropriate channel in Discord based on the Discord webhook URL provided in the .env file.

Feel free to customize the serverless function according to your needs. You can modify the logic for processing webhook events and formatting the message before sending it to Discord.

## License
This project is licensed under the [MIT License](LICENSE).


