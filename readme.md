Documentation is copy pasted from the [Twitch Documentation Get Started Guide](https://dev.twitch.tv/docs/irc/get-started)

# Getting Started with Chat & Chatbots

Twitch provides an Internet Relay Chat (IRC) interface that lets chatbots connect to Twitch channels using a WebSocket or TCP connection. Once connected, bots can send and receive chat messages. For example, bots can provide simple reminders like get up and move or hydrate, or they can perform Twitch actions like banning a user, or they can react to user input.

This getting started example is going to react to the user entering the !dice command. When a user enters !dice in the channel’s chat room, the bot randomly generates a number from a six-sided die (1 through 6). Here’s what it looks like in chat:

![Drag Racing](https://dev.twitch.tv/docs/assets/uploads/chatbots.png)

## Prerequisites

-   Node.js — This example uses Node.js. If you don’t have Node installed, you can download and install it from Node.js.
-   WebSocket package — This example uses tmi.js, which is a third-party, Twitch-focused WebSocket package. This package supports both local clients and browsers. Installation instructions are included in the steps below.

## Initialize and install the package

Open a terminal window and create a folder for this example.

```bash
mkdir dice
cd dice
```

In the dice folder you created, initialize Node. For the entry point setting, enter bot.js.

```bash
npm init
```

Install the tmi.js package.

```bash
npm install tmi.js
```

## Create the bot.js file

Using your favorite IDE, create a file named bot.js in the dice folder. Copy the following code and paste it in the bot.js file.

```js
const tmi = require('tmi.js');

// Define configuration options
const opts = {
    identity: {
        username: '<BOT_USERNAME>',
        password: '<OAUTH_TOKEN>',
    },
    channels: ['<CHANNEL_NAME>'],
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
    if (self) {
        return;
    } // Ignore messages from the bot

    // Remove whitespace from chat message
    const commandName = msg.trim();

    // If the command is known, let's execute it
    if (commandName === '!dice') {
        const num = rollDice();
        client.say(target, `You rolled a ${num}`);
        console.log(`* Executed ${commandName} command`);
    } else {
        console.log(`* Unknown command ${commandName}`);
    }
}

// Function called when the "dice" command is issued
function rollDice() {
    const sides = 6;
    return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}
```

## Specify the configuration settings

Before running the code, you must replace the placeholder strings.

```js
// Define configuration options
const opts = {
    identity: {
        username: '<BOT_USERNAME>',
        password: '<OAUTH_TOKEN>',
    },
    channels: ['<CHANNEL_NAME>'],
};
```

-   Replace `<BOT_USERNAME>` with your Twitch account’s login username (all lowercase). Chatbot messages will be sent from this account.

-   Replace `<OAUTH_TOKEN>` with the password you want the bot to connect with. The string’s format is oauth:token where token is a user access token. Before you can get a user accesss token, you must register this bot. For details about how to register a bot (app), see [Registering your app](https://dev.twitch.tv/docs/authentication/register-app). When specifying the redirect URI, use http://localhost:3000. Capture your client ID and secret for the next step.

After registering the bot, use one of the following options to get an access token:

-   If you have the [Twitch CLI](https://dev.twitch.tv/docs/cli) installed, use the CLI’s [token](https://dev.twitch.tv/docs/cli/token-command#user-access-token) command to get a user access token for the <BOT_USERNAME> Twitch account. Specify the **chat:read** and **chat:edit** scopes. If you’re not familiar with Twitch’s command line interface, you should give it a try.

Follow the [Authorization code flow example](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth#authorization-code-flow-example) to get a user access token for the `<BOT_USERNAME>` Twitch account. In the `/authorize` URI, replace the _client_id_ parameter’s value with your client ID and the scope query parameter’s value with `chat%3Aread+chat&3Aedit` (for example, `&scope=chat%3Aread+chat&3Aedit`). In the body of the POST, replace the _client_id_ parameter’s value with your client ID, the _client_secret_ parameter’s value with your client’s secret, and the code parameter’s value with the code that `/authorize` returned.

-   Replace `<CHANNEL_NAME>` with the Twitch channel that you want the bot to join. For this example, set it to your Twitch account’s login username (all lowercase).

For information about nicknames and passwords, see [Authenticating with the Twitch IRC server](https://dev.twitch.tv/docs/irc/authenticate-bot).

## Running the bot

In a terminal window, enter:

```bash
node bot.js
```

The bot is running locally and connected to the Twitch IRC server if it prints “Connected to…” in the terminal window. Now let’s roll the die.

1. Open a browser and navigate to `https://www.twitch.tv/\<CHANNEL NAME\>`.
2. Open the channel’s chat room.
3. Enter **!dice** in the chat room’s message box.

The bot responds to the **!dice** command by sending a message with the number rolled (for example, You rolled a 4). The bot responds only to the **!dice**.

## Troubleshooting

If the chatbot receives messages, but fails to send messages when the !dice command is detected, the account being used for the chatbot may need to have a phone number verified. Refer to [Phone Verification](https://dev.twitch.tv/docs/irc) for more information.

## Next steps

-   For more information about Twitch chatbots and IRC, see the [Chatbots & IRC Guide](https://dev.twitch.tv/docs/irc).
-   For authentication options, see [Authenticating with the Twitch IRC server](https://dev.twitch.tv/docs/irc/authenticate-bot). Twitch recommends using the Authorization Code flow.
-   For help, post questions in the chat category on the [Twitch developer forums](https://discuss.dev.twitch.tv/c/chat/3) or join the [TwitchDev Discord server](https://discord.com/invite/G8UQqNy).
