const {SlashCommandBuilder} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong'),
    async execute(interaction){
        await interaction.reply("pong!");
        await interaction.followUp({
            content: `Pong again!!`,
            ephemeral:true
        })
    },
};