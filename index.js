const Discord = require('discord.js')
const fs = require('fs')

const client = new Discord.Client()

const playSound = async (channel) => {
  const connection = await channel.join();
  const dispatcher = connection.play(fs.createReadStream('./airhorn.ogg', {
    type: 'ogg/opus'
  }))
  
  dispatcher.on('finish', () => {
    dispatcher.destroy()
    connection.disconnect()
  });
}

const handleMessage = async message => {
  if (!message.guild) return;

  if (message.content === '!airhorn') {
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voice.channel) {
      playSound(message.member.voice.channel);
    } else {
      message.reply(`join a channel! (╯°□°)╯︵ ┻━┻`);
    }
  }
  
  // For testing
  if (message.content === '!ping') {
    message.reply(`pong! (╯°□°)╯︵ ┻━┻`);
  }
}


/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', handleMessage);

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(process.env.DISCORD_SECRET);