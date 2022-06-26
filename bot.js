const tmi = require('tmi.js');
require('dotenv').config();

const USERNAME = process.env.BOT_USERNAME;
const TOKEN = process.env.OAUTH_TOKEN;
const CHANNEL = process.env.CHANNEL_NAME;

// Define configuration options
const opts = {
    identity: {
        username: USERNAME,
        password: TOKEN,
    },
    channels: [CHANNEL],
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
    }
    if (commandName.includes('Bonjour')) {
        console.log('Salut mec!');
    }
    if (commandName.includes('HeyGuys')) {
        console.log('heyGuys');
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
