const {SlashCommandBuilder, Client} = require("discord.js")
//const {client} = require("../../index.js")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Roundtrip latency')
,
    async execute(interaction){
        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
        interaction.followUp(`Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
        
    },
};