const { Client, TextChannel, Events } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);

    // Replace THREAD_CHANNEL_ID with the actual ID of the thread channel you want to send the message to
    const threadChannelId = '1106250746095214765';

    try {
      // Fetch the thread channel object using the threadChannelId
      const threadChannel = await client.channels.fetch(threadChannelId);
      
      // Check if the channel is a thread channel
      if (threadChannel.isThread()) {
        // Send the message in the thread channel
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
