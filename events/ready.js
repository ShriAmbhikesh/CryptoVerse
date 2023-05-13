const { Client, TextChannel, Events } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
    const threadChannelId = '1106250746095214765';

    try {
      const threadChannel = await client.channels.fetch(threadChannelId);
      
     
      if (threadChannel.isThread()) {
        const message = await threadChannel.send('Bot is now online in this thread!');
        console.log(`Message sent in thread ${threadChannel.name}: ${message.content}`);
      } else {
        console.log('The specified channel is not a thread channel.');
      }
    } catch (error) {
      console.error(`Error sending message: ${error}`);
    }
  },
};
