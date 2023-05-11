const {SlashCommandBuilder} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("server-info")
        .setDescription("Provides Information about the server"),
    async execute(interaction){
        console.log(interaction.channel)
        await interaction.reply({
            content: `this is ${interaction.guild.name} and you are in ${interaction.channel}`,
            ephemeral:true
        })
    },

};