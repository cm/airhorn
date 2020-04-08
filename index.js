const Discord = require('discord.js')
const fs = require('fs')

const client = new Discord.Client()

const responseNames = [
  'chump',
  'doofus',
  'fool',
  'jackass',
  'moron',
  'nerd',
  'nimrod',
  'nitwit',
  'numnuts',
  'schlub',
  'sucker',
  'twit'
]

const audioOptions = {
  'airhorn': { file: 'airhorn', weight: '1000' },
}

const playSound = async (command, channel) => {
  const connection = await channel.join();
  const dispatcher = connection.play(fs.createReadStream('./media.webm'), {
    type: 'webm/opus',
  })

  dispatcher.on('speaking', speaking => {
    if (!speaking) connection.disconnect()
  })
}

const handleReady = async () => {

}

const handleMessage = async message => {
  if (!message.guild) return;

  if (message.content === '!airhorn') {
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
    } else {
      message.reply(`Join a channel ${null}! (╯°□°)╯︵ ┻━┻`);
    }
  }
}

client.on('message', handleMessage)

client.login('token');